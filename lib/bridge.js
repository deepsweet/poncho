var page = require('webpage').create(),
    args = require('system').args;

var filename = args[1],
    port = args[2],
    urlGet = 'http://127.0.0.1:' + port + '/' + filename,
    urlPost = 'http://127.0.0.1:' + port + '/coverage';

page.onAlert = function(data) {
    page.open(urlPost, 'POST', data, phantom.exit);
};

page.open(urlGet, function(status) {
    if(status !== 'success') {
        phantom.exit(1);
    }
});
