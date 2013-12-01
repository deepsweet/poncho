window.blanket.customReporter = function(report) {

    /*globals alert*/
    /*eslint guard-for-in:0*/
    'use strict';

    var a = document.createElement('a'),
        str = '';

    for(var file in report.files) {
        var data = report.files[file];

        a.href = file;

        str += 'SF:' + a.pathname.slice(1) + '\n';

        for(var i = 0; i < data.source.length; i++) {
            var num = i + 1;

            if(data[num] !== undefined) {
                str += 'DA:' + num + ',' + data[num] + '\n';
            }
        }

        str += 'end_of_record\n';
    }

    alert(JSON.stringify({ data: str }));

};
