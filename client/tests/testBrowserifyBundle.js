// karma-browserify can't handle seperate lib/app bundles so we'll require them into 1 file
require('../app/js/lib.js');
require('../app/js/app.js');
window.Promise = require('../../node_modules/bluebird/js/main/bluebird.js');
