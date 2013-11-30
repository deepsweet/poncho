var program = require('commander'),
    pkg = require('../package.json'),
    poncho = require('../');

program
    .version(pkg.version)
    .usage('<file>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
}

poncho({ filename: program.args[0] }, function(data) {
    console.log(JSON.parse(data));
});
