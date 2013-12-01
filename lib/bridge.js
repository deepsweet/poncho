/*global phantom*/
'use strict';

var page = require('webpage'),
    args = require('system').args,
    fs = require('fs');

var ponchoDir = args[1],
    injectPath = args[2],
    filePath = args[3],
    port = args[4],
    reporter = args[5],
    content,
    inject,
    urlGet = 'http://127.0.0.1:' + port + '/' + filePath,
    urlPost = 'http://127.0.0.1:' + port + '/coverage';

page = page.create();

page.onAlert = function(data) {
    page.open(urlPost, 'POST', data, phantom.exit);
};

filePath = fs.absolute(filePath);

content = fs.read(filePath);
inject = fs.read(injectPath);

inject = inject.split('{PONCHO}').join(ponchoDir);
inject = inject.replace('{REPORTER}', reporter);

content = content.replace(/(<script.+?data-cover)/, inject + '$1');

page.setContent(content, urlGet);
