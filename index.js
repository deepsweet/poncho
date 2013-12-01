'use strict';

var server = require('./lib/server.js'),
    phantom = require('./lib/phantom.js');

module.exports = function(params, callback) {

    // default port
    params.port = params.port || '8082';
    // poncho directory path
    params.ponchoDir = __dirname;

    phantom(params, server(params.port, callback));

};
