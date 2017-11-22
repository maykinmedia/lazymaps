## Classes

<dl>
<dt><a href="#GMap">GMap</a></dt>
<dd><p>Constructs a Google Map on node.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#GOOGLE_MAPS_API">GOOGLE_MAPS_API</a></dt>
<dd><p>{string} The Google Maps API endpoint.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#lazymaps">lazymaps(selector, apiKey)</a> ⇒ <code>Array.&lt;Promise&gt;</code></dt>
<dd><p>Creates new GMap() for every element matching selector.</p>
</dd>
</dl>

<a name="GMap"></a>

## GMap
Constructs a Google Map on node.

**Kind**: global class  

* [GMap](#GMap)
    * [new GMap(node, apiKey)](#new_GMap_new)
    * [.map](#GMap+map)
    * [.googleMap](#GMap+googleMap)
    * [.markers](#GMap+markers)
    * [.infoWindows](#GMap+infoWindows)
    * [.googleMapsSrc](#GMap+googleMapsSrc)
    * [.setUpGoogleMaps()](#GMap+setUpGoogleMaps)
    * [.installGoogleMapsApi()](#GMap+installGoogleMapsApi) ⇒ <code>Promise</code>
    * [.isGoogleMapsApiInstalled()](#GMap+isGoogleMapsApiInstalled) ⇒ <code>boolean</code>
    * [.createMap()](#GMap+createMap) ⇒ <code>Promise</code>

<a name="new_GMap_new"></a>

### new GMap(node, apiKey)
Constructor method.


| Param | Type | Description |
| --- | --- | --- |
| node | <code>HTMLElement</code> | The Google Map to install. |
| apiKey | <code>string</code> | Our Google Maps JavaScript key. |

<a name="GMap+map"></a>

### gMap.map
{HTMLElement} Reference to the map container.

**Kind**: instance property of <code>[GMap](#GMap)</code>  
<a name="GMap+googleMap"></a>

### gMap.googleMap
{Object} The Google Maps map instance.

**Kind**: instance property of <code>[GMap](#GMap)</code>  
<a name="GMap+markers"></a>

### gMap.markers
{Object[]} An array of optional markers.

**Kind**: instance property of <code>[GMap](#GMap)</code>  
<a name="GMap+infoWindows"></a>

### gMap.infoWindows
{Object[]} An array of optional info windows..

**Kind**: instance property of <code>[GMap](#GMap)</code>  
<a name="GMap+googleMapsSrc"></a>

### gMap.googleMapsSrc
{string} Parsed string containing the complete URL to the Google Maps API (including API key).

**Kind**: instance property of <code>[GMap](#GMap)</code>  
<a name="GMap+setUpGoogleMaps"></a>

### gMap.setUpGoogleMaps()
Installs Google Maps API.
Creates the map when ready.

**Kind**: instance method of <code>[GMap](#GMap)</code>  
<a name="GMap+installGoogleMapsApi"></a>

### gMap.installGoogleMapsApi() ⇒ <code>Promise</code>
Installs the Google Maps API if not already installed.
Polls for Google Maps api and resolves promise when available.

**Kind**: instance method of <code>[GMap](#GMap)</code>  
**Returns**: <code>Promise</code> - resolve when API is ready to use.  
<a name="GMap+isGoogleMapsApiInstalled"></a>

### gMap.isGoogleMapsApiInstalled() ⇒ <code>boolean</code>
Returns whether the Google Maps API is installed.

**Kind**: instance method of <code>[GMap](#GMap)</code>  
<a name="GMap+createMap"></a>

### gMap.createMap() ⇒ <code>Promise</code>
Creates the Google Maps instance.

**Kind**: instance method of <code>[GMap](#GMap)</code>  
<a name="GOOGLE_MAPS_API"></a>

## GOOGLE_MAPS_API
{string} The Google Maps API endpoint.

**Kind**: global constant  
<a name="lazymaps"></a>

## lazymaps(selector, apiKey) ⇒ <code>Array.&lt;Promise&gt;</code>
Creates new GMap() for every element matching selector.

**Kind**: global function  

| Param | Type |
| --- | --- |
| selector | <code>string</code> | 
| apiKey | <code>string</code> | 

