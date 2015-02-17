var files = require('./files.js');

module.exports = {

  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '../',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['jasmine', 'traceur'],


  preprocessors: {
    'public/js/**/*.js': ['traceur']
  },

  traceurPreprocessor: {
    // options passed to the traceur-compiler
    // see traceur --longhelp for list of options
    options: {
      sourceMaps: true,
      modules: 'amd'
    },
  },

  // list of files / patterns to load in the browser
  files: files,


  // list of files to exclude
  exclude: [
  ],

  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,

};