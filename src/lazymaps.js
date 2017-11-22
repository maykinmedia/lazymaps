import 'babel-polyfill';



/** {string} The Google Maps API endpoint. */
export const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js';


/**
 * Constructs a Google Map on node.
 * @class
 */
class GMap {
    /**
     * Constructor method.
     * @param {HTMLElement} node The Google Map to install.
     * @param {string} apiKey Our Google Maps JavaScript key.
     * @returns {Promise} Promise which resolves and calls the the createMap() function as son as THe Google API beocmes availalble.
     */
    constructor(node, apiKey) {
        if(!apiKey) {
            logKeyMissing();
            return;
        }

        /** {HTMLElement} Reference to the map container. */
        this.map = node;

        /** {Object} The Google Maps map instance. */
        this.googleMap = {};

        /** {Object[]} An array of optional markers. */
        this.markers = [];

        /** {Object[]} An array of optional info windows.. */
        this.infoWindows = [];

        /** {string} Parsed string containing the complete URL to the Google Maps API (including API key). */
        this.googleMapsSrc = GOOGLE_MAPS_API + '?key=' + apiKey;

        return this.setUpGoogleMaps();
    }

    /**
     * Installs Google Maps API.
     * Creates the map when ready.
     */
    setUpGoogleMaps() {
        return this.installGoogleMapsApi()
            .then(this.createMap.bind(this));
    }

    /**
     * Installs the Google Maps API if not already installed.
     * Polls for Google Maps api and resolves promise when available.
     * @returns {Promise} resolve when API is ready to use.
     */
    installGoogleMapsApi() {
        // Installs the Google Maps API if not already installed.
        if (!this.isGoogleMapsApiInstalled()) {
            let script = document.createElement('script');
            script.src = this.googleMapsSrc;
            document.head.appendChild(script);
        }
        // Polls for Google Maps api and resolves promise when available.
        return new Promise((resolve) => {
            function pollGoogleObject() {
                if (window.google && window.google.maps) {
                    resolve();
                    return;
                }
                setTimeout(pollGoogleObject, 100);
            }

            setTimeout(pollGoogleObject, 100);
        });
    }

    /**
     * Returns whether the Google Maps API is installed.
     * @returns {boolean}
     */
    isGoogleMapsApiInstalled() {
        return !![...document.scripts].find(script => script.src === this.googleMapsSrc);
    }

    /**
     * Creates the Google Maps instance.
     * @returns {Promise}
     */
    createMap() {
        return new Promise((resolve, reject) => {

            if (!(this.map.dataset.coordinates && this.map.dataset.zoom)) {
                logKeyMissing();
                reject();
            }

            let lat = parseFloat(this.map.dataset.coordinates.split(',')[0]);
            let lng = parseFloat(this.map.dataset.coordinates.split(',')[1]);
            let zoom = parseInt(this.map.dataset.zoom);
            let markers = (this.map.dataset.markers) ? JSON.parse(this.map.dataset.markers) : [];
            let disableDefaultUI = this.map.dataset.disableDefaultUi || false;
            let disableInfoWindows = this.map.dataset.disableInfoWindows || false;
            let infoWindowConfig = (this.map.dataset.infowindow) ? JSON.parse(this.map.dataset.infowindow) : {};

            if (!lat || !lng || !zoom) {
                console.warn('Parsing failed, please provide data-coordinates as commas separated lat/lng pair and data-zoom as number.');
                reject();
            }

            this.googleMap = new google.maps.Map(this.map, {
                center: {lat, lng},
                zoom,
                disableDefaultUI
            });

            this.markers = markers.map(marker => {
                let lat = parseFloat(marker.latitude);
                let lng = parseFloat(marker.longitude);

                let mapMarker = new google.maps.Marker({
                    map: this.googleMap,
                    position: {lat, lng},
                    title: marker.title,
                    optimized: false,  // IE
                });

                if (!disableInfoWindows) {
                    let infoWindow = new google.maps.InfoWindow(infoWindowConfig);
                    infoWindow.setContent(marker.html || `<h1>${marker.title}</h1><p>${marker.description}</p>`);

                    mapMarker.addListener('click', () => {  // jshint ignore:line
                        infoWindow.open(this.googleMap, mapMarker);
                    });

                    this.infoWindows.push(infoWindow)
                }

                // if (this.map.dataset.markerIcon) {
                //     tempMarker.icon = {
                //         url: this.map.dataset.markerIcon,
                //         scaledSize: new google.maps.Size(16, 27),  // FIXME
                //     };
                // }
                return mapMarker;
            });

            resolve(this);
        });
    }
}


/**
 * Creates new GMap() for every element matching selector.
 * @param {string} selector
 * @param {string} apiKey
 * @returns {Promise[]}
 */
function lazymaps(selector, apiKey) {
    if(!apiKey) {
        logKeyMissing();
        return;
    }
    return [...document.querySelectorAll(selector)].map(gmap => new GMap(gmap, apiKey));
}


/**
 * Logs a message indicating that no API key is provided.
 * @private
 */
function logKeyMissing() {
    console.warn('No Google Maps API key provided, please pass key as second argument.')
}


export default GMap;
export { GMap, lazymaps };
