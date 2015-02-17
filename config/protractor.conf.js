/*jshint expr: true*/
/*global browser: true*/
var TEST_DIR =  '../tests/';
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs : [     '../tests/e2e/_protractor.js'       ],
  capabilities: {'browserName': 'chrome'    },
  chromeDriver: './chromedriver',
  onPrepare: function() {
    "use strict";
    browser.driver.get('http://localhost:5000/');
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /\#\//.test(url);
      });
    });
  },
  jasmineNodeOpts: {
    showColors: true
  }
};