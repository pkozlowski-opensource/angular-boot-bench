exports.config = {
  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      //Important for benchpress to get timeline data from the browser
      'args': ['--js-flags=--expose-gc'],
      'perfLoggingPrefs': {
        'traceCategories': 'v8,blink.console,devtools.timeline'
      }
    },
    loggingPrefs: {
      performance: 'ALL'
    }
  },

  specs: ['benchmark.spec.js'],
  framework: 'jasmine2',

  onPrepare: function() {
    beforeEach(function() {
      browser.ignoreSynchronization = false;
    });
  },

  // restart browser between tests
  // so that the browser does not keep
  // optimizations
  restartBrowserBetweenTests: true,

  beforeLaunch: function () {
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};