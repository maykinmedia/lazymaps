[![Build Status](https://travis-ci.org/maykinmedia/lazymaps.svg?branch=master)](https://travis-ci.org/maykinmedia/lazymaps)
[![Coverage Status](https://coveralls.io/repos/github/maykinmedia/lazymaps/badge.svg?branch=master)](https://coveralls.io/github/maykinmedia/lazymaps?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/300ec356bdf46e7469e3/maintainability)](https://codeclimate.com/github/maykinmedia/lazymaps/maintainability)
[![Lintly](https://lintly.com/gh/maykinmedia/lazymaps/badge.svg)](https://lintly.com/gh/maykinmedia/lazymaps/)

[![NPM](https://nodei.co/npm/lazymaps.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/lazymaps/)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/lazymaps.svg)](https://saucelabs.com/u/lazymaps)


# lazymaps

> Lazy loading, easy to use wrapper around the Google Maps API.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i lazymaps --save
```

## Usage

*Code examples in es6, library is es5 compatible.*
*See [doc](https://github.com/maykinmedia/lazymaps/blob/master/doc/lazymaps.md) for full API documentation.*

**HTML: Basic map**

```html
<!-- data-coordinates and data-zoom are required. -->
<div class="map" data-coordinates="52.3766849,4.8855208" data-zoom="17"></div>
```


**HTML: Adding markers**

```html
<div class="map"
     data-coordinates="52.3766849,4.8855208"
     data-zoom="17"
     data-markers='[{
        "latitude": 52.3766849,
        "longitude": 4.8855208,
        "title": "Maykin Media",
        "description": "Awesome webdevelopment",
     }]'
></div>
```


**HTML: Additional parameters**

`data-disable-default-ui="true"`: Disables the default UI controls.
`data-disable-info-windows="true`: Disables info windows (see result of new GMap(node, apiKey) to access internal objects like map and markers.



**JS: Creating a single map**

```js
import GMap from 'lazymaps';


let node = document.querySelector('.map');
let apiKey = 'ABC'  // https://developers.google.com/maps/documentation/javascript/get-api-key
new GMap(this.node, apiKey);
```


**JS: Create multiple maps using a selector**

```js
import { lazymaps } from 'lazymaps';


let apiKey = 'ABC'  // https://developers.google.com/maps/documentation/javascript/get-api-key
lazymaps('.map', apiKey);
```


**JS: Customizing the map.**

`new GMap(node, apikey)` returns a `Promise` object, lazymaps(selector, apiKey) returns an array of these promises. The resulting promises are resolved with the GMap instance. This can be used for further map customisation, please refer the API documentation [doc](https://github.com/maykinmedia/lazymaps/blob/master/doc/lazymaps.md) for available properties.


## Running tests

```sh
$ gulp lint   // Check for linting errors
$ gulp test   // Run the tests
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/maykinmedia/lazymaps/issues).

## Author

**Maykin Media**

* [maykinmedia.nl](https://www.maykinmedia.nl/)
* [github/maykinmedia](https://github.com/maykinmedia)
* [twitter/maykinmedia](http://twitter.com/maykinmedia)

## License

Copyright © 2017 [Maykin Media](https://www.maykinmedia.nl/)
Licensed under the MIT license.
