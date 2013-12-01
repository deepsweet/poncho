'use strict';

var http = require('http'),
    path = require('path'),
    Static = require('node-static'),
    spawn = require('child_process').spawn;

module.exports = function(params, callback) {

    // default port
    params.port = params.port || '8082';

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

    }).listen(params.port);

        // spawn PhantomJS with arguments
    var phantomjs = spawn('phantomjs', [
            // bridge file
            path.resolve(__dirname, './lib/bridge.js'),
            // poncho relative dir
            path.relative(path.dirname(params.file), __dirname),
            // inject file
            path.resolve(__dirname, './lib/inject.html'),
            // test file
            params.file,
            // server port
            params.port,
            // reporter
            params.reporter
        ]);

    // phantomjs.stderr.pipe(process.stdout);
    phantomjs.stdout.pipe(process.stdout);

    // bind any PhantomJS errors to current process
    phantomjs.on('exit', function(code) {
        if(code === 127) {
            /*eslint no-console:0*/
            console.error('PhantomJS is not installed?');
        }

        if(code > 0) {
            server.close(function() {
                process.exit(code);
            });
        }
    });

};
