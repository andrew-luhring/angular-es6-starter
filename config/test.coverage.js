var commonConfig = require('./common.conf.js');

module.exports = function(config) {
  "use strict";
  commonConfig.reporters = ['progress','coverage'];
  commonConfig.browsers  = ['PhantomJS', 'Chrome', 'Safari', 'Firefox'];
  commonConfig.captureTimeout = 120000;
  commonConfig.singleRun = true;
  commonConfig.logLevel  = config.LOG_DEBUG;
  commonConfig.preprocessors = {};
  commonConfig.preprocessors['./public/js/**/*.js'] = ['coverage'];

  config.set(commonConfig);
};