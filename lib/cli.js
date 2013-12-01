/*eslint no-console:0*/
'use strict';

var program = require('commander'),
    pkg = require('../package.json'),
    poncho = require('../');

program
    .version(pkg.version)
    .usage('[options] <file>')
    .option('-R, --reporter [type]', 'reporter: plain (default) | lcov | json')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
}

poncho(
    {
        file: program.args[0],
        reporter: program.reporter || 'plain'
    },
    function(data) {
        if(typeof data === 'object') {
            data = JSON.stringify(data);
        }

        console.log(data);
    }
);
