blanket.customReporter = function(report) {

    var a = document.createElement('a'),
        str = '';

    for(var filename in report.files) {
        var data = report.files[filename];

        a.href = filename;

        str += 'SF:' + a.pathname.slice(1) + '\n';

        for(var i = 0; i < data.source.length; i++) {
            var num = i + 1;

            if (data[num] !== undefined) {
                str += 'DA:' + num + ',' + data[num] + '\n';
            }
        }

        str += 'end_of_record\n';
    }

    alert(str);

};
