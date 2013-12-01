(function() {

    'use strict';

    (function(runner) {
        runner.on('start', function() {
            window.blanket.setupCoverage();
        });

        runner.on('end', function() {
            window.blanket.onTestsDone();
        });

        runner.on('suite', function() {
            window.blanket.onModuleStart();
        });

        runner.on('test', function() {
            window.blanket.onTestStart();
        });

        runner.on('test end', function(test) {
            window.blanket.onTestDone(test.parent.tests.length, test.state === 'passed');
        });
    })(window.Mocha.Runner.prototype);

    var oldRun = window.mocha.run,
        oldCallback;

    window.mocha.run = function(finishCallback) {
        oldCallback = finishCallback;
    };

    window.blanket.beforeStartTestRunner({
        callback: function(){
            oldRun(oldCallback);
        }
    });

})();
