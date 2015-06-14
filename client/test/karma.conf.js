// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-06-17 using
// generator-karma 0.8.2

module.exports = function(config) {
  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/ng-file-upload-shim/angular-file-upload-shim.js',
      'bower_components/angular/angular.js',
      'bower_components/ng-file-upload/angular-file-upload.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angucomplete-alt/angucomplete-alt.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-filter/dist/angular-filter.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/materialize/bin/materialize.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower

      'app/src/**/module.js', // all modules are loaded first
      'app/src/**/*.js',
      'app/src/**/*.html',
      'test/spec/**/*.js'
    ],

    reporters: ['progress', 'coverage', 'junit'],

    preprocessors: {
      'app/src/**/*.html': ['ng-html2js'],
      'app/src/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'htmlTemplates'
    },

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'report/coverage/' },
        { type: 'cobertura', dir: 'report/coverage/' },
      ]
    },

    junitReporter: {
      outputFile: 'report/test/junit.xml',
      suit: ''
    },

    // list of files / patterns to exclude
    exclude: [],

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
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,
    
    // to avoid DISCONNECTED messages
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 60000, //default 10000

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
