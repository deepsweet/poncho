'use strict';

var http = require('http'),
    Static = require('node-static');

module.exports = function(port, callback) {

    var file = new Static.Server('./', {
            cache: false,
            headers: { 'Cache-Control': 'no-cache, must-revalidate, max-age=0' }
        }),
        server;

    // create HTTP server
    server = http.createServer(function(req, res) {

        var post = '';

        // if coverage was requested – collect POST data…
        if(req.url === '/coverage') {
            req.on('data', function(chunk) {
                post += chunk;
            });
        }

        req.on('end', function() {
            if(post) {
                // …and callback it
                post = JSON.parse(post);
                callback(post.data);

                server.close();
            }

            // serve static files
            file.serve(req, res);
        }).resume();

    }).listen(port, '127.0.0.1');

    return server;

};
