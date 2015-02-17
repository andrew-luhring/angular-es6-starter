var commonConfig = require('./common.conf.js');

module.exports = function(config) {
  "use strict";
  commonConfig.reporters = ['progress'];
  commonConfig.browsers  = ['PhantomJS'];
  commonConfig.captureTimeout = 60000;
  commonConfig.singleRun = false;
  commonConfig.logLevel  = config.LOG_INFO;


  config.set(commonConfig);
};

