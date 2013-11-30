blanket.customReporter = function(report) {

    var a = document.createElement('a'),
        out = [];

    for(var filename in report.files) {
        a.href = filename;

        var data = report.files[filename],
            ret = {
                filename: a.pathname.slice(1),
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

        out.push(ret);
    }

    alert(JSON.stringify(out));

};
