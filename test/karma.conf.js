// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-09-08 using
// generator-karma 1.0.0

module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            "browserify", "mocha", "chai"
        ],

        browserify: {
            debug: true
        },


        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/allmighty-autocomplete/script/autocomplete.js',

            'dist/kax_hours_select.js',
            'test/spec/{,**/}*.js',

            'dist/{,**/}*.html'
        ],
        // add preprocessor to the files that should be
        // processed via browserify
        preprocessors: {
            'test/spec/{,**/}*.js': ['browserify'],
            "dist/{,**/}*.html": ["ng-html2js"]
        },

        // reporters configuration 
        reporters: ['mocha'],

        // reporter options 
        mochaReporter: {
            showDiff: true
        },

        ngHtml2JsPreprocessor: {
            // strip app from the file path
            stripPrefix: 'dist/',
                // the name of the Angular module to create
            moduleName: "kax.templates"
        },

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            "PhantomJS"
        ],

        // Which plugins to enable
        plugins: [
            "karma-browserify",
            "karma-phantomjs-launcher",
            "karma-mocha",
            "karma-chai",
            'karma-mocha-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // logLevel: config.LOG_DEBUG,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
