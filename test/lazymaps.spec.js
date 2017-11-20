import GMap, { GMap as GMap2, GOOGLE_MAPS_API, lazymaps } from '../src/lazymaps.js';


window.__env__ = window.__env__ || {};
const API_KEY = window.__env__.GOOGLE_MAPS_API_KEY || 'AIzaSyAvcFQdsr3rIbdCIlcygzMtVrdDoZ3hc44';


describe('module', function() {
    it('should export a default', () => {
        expect(GMap).toBeTruthy();
    });

    it('should export a name', () => {
        expect(GMap2).toBeTruthy();
    });
    
    it('should export GOOGLE_MAPS_API', () => {
        expect(GOOGLE_MAPS_API).toBeTruthy();
    });
});

describe('GMap', function() {
    beforeEach(() => {
        setFixtures(`
            <div class="map" data-coordinates="52.3766882,4.8855208,17" data-zoom="15"></div>
        `);

        this.GMap = function() {};

        const proto = GMap.prototype;
        this.GMap = function() {};
        this.GMap.prototype = proto;
        
        this.node = document.querySelector('.map');

        this.scripts = document.scripts;

        if (!API_KEY) {
            console.warn('Tests may fail due to missinge API key, please set GOOGLE_MAPS_API_KEY environment variable.');
        }
    });
    
    it('should log a warning when apiKey is not set', () => {
        spyOn(console, 'warn');
        let map = new this.GMap();
        map.constructor(this.node);
        
        expect(console.warn).toHaveBeenCalled();
        expect(console.warn.calls.mostRecent().args[0]).toContain('key');
    });

    it('should install the Google maps API', () => {
        let map = new this.GMap();
        spyOn(map, 'setUpGoogleMaps').and.callThrough();

        map.constructor(this.node, API_KEY);
        expect(map.setUpGoogleMaps).toHaveBeenCalledTimes(1);        
    });
    
    it('should create the map after the API is is installed', (done) => {
        let map = new this.GMap();
        spyOn(map, 'installGoogleMapsApi').and.callThrough();
        spyOn(map, 'createMap').and.callThrough();

        let promise = map.constructor(this.node, API_KEY);
        
        expect(map.createMap).toHaveBeenCalledTimes(0);        
        promise
            .then(() => {
                expect(map.createMap).toHaveBeenCalledTimes(1);
                done();
            });
    });

    it('should register the correct script', (done) => {
        let map = new this.GMap();
        map.constructor(this.node, API_KEY)
            .then(() => {
                expect([...this.scripts]
                    .find(script => script.src === GOOGLE_MAPS_API + '?key=' + API_KEY))
                    .toBeTruthy();
                done();
            });
    });
    
    it('should not register the script when isGoogleMapsApiInstalled() returns true', () => {
        let map = new this.GMap();
        spyOn(document.head, 'appendChild');
        spyOn(map, 'isGoogleMapsApiInstalled').and.returnValue(true);
        
        map.installGoogleMapsApi();
        expect(document.head.appendChild).not.toHaveBeenCalled();
    });
    
    it('should return false when isGoogleMapsApiInstalled() is called and the script doesn\'t exists', (done) => {
        [...document.scripts].forEach(script => {
            if (script.src.match('googleapis.com')) {
                document.head.removeChild(script);
            }
        });

        delete window.google;

        let map1 = new this.GMap();
        spyOn(map1, 'isGoogleMapsApiInstalled').and.callThrough();

        let promise = map1.constructor(this.node, API_KEY);
        // expect(map1.isGoogleMapsApiInstalled.calls.mostRecent().returnValue).toBeFalsy();

        promise
            .then(() => {
                map1.constructor(this.node, API_KEY)
                    .then(() => {
                        expect(map1.isGoogleMapsApiInstalled.calls.mostRecent().returnValue).toBeTruthy();
                        done();
                    });
            });
    });

    it('should expose google if all API\'s are loaded', (done) => {
        let map = new this.GMap();
        map.constructor(this.node, API_KEY)
            .then(() => {
                expect(window.google).toBeTruthy();
                done();
            });
    });

    it('should create a google map instance', () => {
        let map = new this.GMap();
        map.constructor(this.node, API_KEY)
            .then(() => {
                expect(this.node.innerHTML).toBeTruthy();
                done();
            });
    });
});


describe('lazymaps', function() {
    beforeEach(() => {
        setFixtures(`
            <div class="map map--1" data-coordinates="52.3766882,4.8855208,17" data-zoom="15"></div>
            <div class="map map--2" data-coordinates="52.3766882,4.8855208,17" data-zoom="15"></div>
        `);
    });

    it('should log a warning when apiKey is not set', () => {
        spyOn(console, 'warn');
        lazymaps('.map');

        expect(console.warn).toHaveBeenCalled();
        expect(console.warn.calls.mostRecent().args[0]).toContain('key');
    });

    it('should do nothing when selector doesn\'t match anything', () => {
        lazymaps('.non-existing-map', API_KEY);
    });


    it('should instantiate a GMap instance for each matching selector', (done) => {
        let map1 = document.querySelector('.map--1');
        let map2 = document.querySelector('.map--2');

        Promise.all(lazymaps('.map', API_KEY))
            .then(() => {
                expect(map1.innerHTML).toBeTruthy();
                expect(map2.innerHTML).toBeTruthy();
                done();
            });
    });
});
