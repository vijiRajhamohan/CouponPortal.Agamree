// support for IE shim...
if (!process.modern) {
    require('core-js/es5');
    require('core-js/es6');
    require('core-js/es7/array');
    require('core-js/es7/object');
    require('core-js/es7/promise');
    require('core-js/es7/reflect');
    require('core-js/es7/map');
    require('core-js/es7/set');
    require('core-js/es7/weak-map');
    require('core-js/es7/weak-set');
}
