'use strict';

var path = require('path'),
    spawn = require('child_process').spawn;

module.exports = function(params, server) {

        // spawn PhantomJS with arguments
    var phantomjs = spawn('phantomjs', [
            // bridge file
            path.resolve(params.ponchoDir, './lib/bridge.js'),
            // poncho relative dir
            path.relative(path.dirname(params.file), params.ponchoDir),
            // inject file
            path.resolve(params.ponchoDir, './lib/inject.html'),
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
