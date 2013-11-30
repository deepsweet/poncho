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

        var data = '';

        // if coverage was requested – collect POST data…
        if(req.url === '/coverage') {
            req.on('data', function(chunk) {
                data += chunk;
            });
        }

        req.on('end', function() {
            if(data) {
                // …and callback it
                callback(data);
                server.close();
            }

            // serve static files
            file.serve(req, res);
        }).resume();

    }).listen(params.port);

        // spawn PhantomJS with arguments
    var phantomjs = spawn('phantomjs', [
            path.resolve(__dirname, './lib/bridge.js'),
            params.filename,
            params.port
        ]);

    // phantomjs.stderr.pipe(process.stdout);
    // phantomjs.stdout.pipe(process.stdout);

    // bind any PhantomJS errors to current process
    phantomjs.on('exit', function(code) {
        if(code === 127) {
            console.error('Perhaps phantomjs is not installed?\n');
        }

        if(code > 0) {
            server.close(function() {
                process.exit(code);
            });
        }
    });

};
