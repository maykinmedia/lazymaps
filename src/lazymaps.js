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
            logKeyWarning();
            return;
        }

        this.map = node;
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
     */
    createMap() {
        if (!(this.map.dataset.coordinates && this.map.dataset.zoom)) {
            console.warn('Please set data-cooordinates and data-zoom on the node you want to use as Google Maps instance.');
            return;
        }

        this.geocoder = new google.maps.Geocoder();

        let lat = parseFloat(this.map.dataset.coordinates.split(',')[0]);
        let lng = parseFloat(this.map.dataset.coordinates.split(',')[1]);
        let zoom = parseInt(this.map.dataset.zoom);

        if (!lat || !lng || !zoom) {
            return;
        }

        this.googleMap = new google.maps.Map(this.map, {
            center: {lat, lng},
            zoom,
            disableDefaultUI: true
        });

        let markers = this.map.dataset.markers;
        if (markers) {
            markers = JSON.parse(markers);

            for (let marker of markers) {
                let lat = parseFloat(marker.latitude);
                let lng = parseFloat(marker.longitude);

                let infowindow = new google.maps.InfoWindow({
                    content: marker.html || `<h1>${marker.label || marker.title}</h1><p>${marker.description}</p>`
                });
                
                let tempMarker = new google.maps.Marker({
                    map: this.googleMap,
                    position: {lat, lng},
                    title: marker.label,
                    optimized: false,  // IE
                });

                if (this.map.dataset.markerIcon) {
                    tempMarker.icon = {
                        url: this.map.dataset.markerIcon,
                        scaledSize: new google.maps.Size(16, 27),
                    };
                }

                tempMarker.addListener('click', () => {  // jshint ignore:line
                    infowindow.open(this.googleMap, tempMarker);  
                });
            }
        }
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
        logKeyWarning();
        return;
    }
    return [...document.querySelectorAll(selector)].map(gmap => new GMap(gmap, apiKey));
}

/**
 * Logs a message indicating that no API key is provided.
 * @private
 */
function logKeyWarning() {
    console.warn('No Google Maps API key provided, please pass key as second argument.')
}

export default GMap;
export { GMap, lazymaps };
