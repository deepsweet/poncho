window.blanket.customReporter = function(report) {

    /*globals alert*/
    /*eslint guard-for-in:0*/
    'use strict';

    var a = document.createElement('a'),
        out = '';

    for(var file in report.files) {
        a.href = file;

        var data = report.files[file],
            ret = {
                file: a.pathname.slice(1),
                coverage: 0,
                hits: 0,
                misses: 0,
                sloc: 0
            };

        for(var i = 1; i <= data.source.length; i++) {
            if(data[i] === 0) {
                ret.misses++;
                ret.sloc++;
            } else if(data[i] !== undefined) {
                ret.hits++;
                ret.sloc++;
            }
        }
        ret.coverage = ret.hits / ret.sloc * 100;

        out += (out ? '\n\n' : '') + 'file: ' + ret.file + '\n';
        out += 'coverage: ' + ret.coverage + '\n';
        out += 'hist: ' + ret.hits + '\n';
        out += 'misses: ' + ret.misses + '\n';
        out += 'sloc: ' + ret.sloc;
    }

    alert(JSON.stringify({ data: out }));

};
