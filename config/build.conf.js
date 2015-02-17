var commonConfig = require('./common.conf.js');

module.exports = function(config) {
  "use strict";
  commonConfig.reporters = ['progress'];
  commonConfig.browsers  = ['PhantomJS'];
  commonConfig.captureTimeout = 120000;
  commonConfig.singleRun = true;
  commonConfig.logLevel  = config.LOG_DEBUG;
  config.set(commonConfig);
};





