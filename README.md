[![Build Status](https://travis-ci.org/maykinmedia/lazymaps.svg?branch=1.0)](https://travis-ci.org/maykinmedia/lazymaps)
[![Coverage Status](https://coveralls.io/repos/github/maykinmedia/lazymaps/badge.svg?branch=master)](https://coveralls.io/github/maykinmedia/lazymaps?branch=master)
[![Code Climate](https://codeclimate.com/github/maykinmedia/lazymaps/badges/gpa.svg)](https://codeclimate.com/github/maykinmedia/lazymaps)
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
*See [doc](doc/) for full API documentation.*

**HTML**

```html
<!-- data--coordinates and data--zoom are required. -->
<div class="map" data-coordinates="52.3766882,4.8855208,17" data-zoom="15"></div>
```


**JS: Creating a single map**

```js
import GMap from 'lazymaps';


let node = document.querySelector('.map');
let apiKey = 'ABC'  // https://developers.google.com/maps/documentation/javascript/get-api-key
new GMap(this.node, apiKey);
```


**JS: Create multiple maps using a selector**

```js
import GMap from 'lazymaps';


let apiKey = 'ABC'  // https://developers.google.com/maps/documentation/javascript/get-api-key
lazymaps('.map', apiKey);
```


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
