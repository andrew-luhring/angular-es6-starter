/*jshint expr: true, strict: false*/
module.exports = function(grunt) {

  var ASSETS_DIR = "./public/"
    , STYLE_DIR =   ASSETS_DIR + "css/"
    , LESS_DIR =    ASSETS_DIR + "less/"
    , JS_DIR  =     ASSETS_DIR + "js/"
    , TEST_DIR  =   "tests/"
    , cssF =        STYLE_DIR  + "style.css"
    , lessF =       LESS_DIR   + "style.less"
    , frontendF =   JS_DIR + "**/*.js"
    , backendF  =   ["./*.js", "./config/*.js"]
    , testF =       TEST_DIR + "_*.js"
    , lesscmd =     'node ./node_modules/.bin/lessc --source-map-map-inline --source-map --source-map-rootpath=../less/ ' + lessF + ' ' + cssF
    , config = {
        pkg: grunt.file.readJSON('package.json')
      , exec: {
          less : lesscmd
        }
      , traceur: {
          options: {
            experimental: true
          }
        , custom: {
            files: [{
              expand: true,
              cwd: 'public/js',
              src: ['**/*.js'],
              dest: 'public/compiled'
            }]
          }
        }
      , jshint: {
          options: {
            jshintrc: true
          }
        , frontend: {
            files: {
              src: [frontendF]
            }
          }
        , backend: {
            files : {
              src: [backendF]
            }
          }

        , test: {
            files : {
              src: [testF]
            }
          }
        }
      , watch: {}
    };

  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-traceur');
  grunt.registerTask( "_watch", "config a watch command" , function() {
      config.watch = {
          backend: {
            files: backendF
          , tasks: ['jshint:backend']
          , options: {
              spawn: false
            }
          }
        , frontend: {
            files: frontendF
          , tasks: ['jshint:frontend']
          , options: {
              spawn: true
            , atBegin: true
            }
          }
        , test: {
            files: testF
          , tasks: ['jshint:test']
          }

        , less : {
            files : [
                LESS_DIR + "*.less"
              , LESS_DIR + "**/*.less"
              , LESS_DIR + "**/**.less"
            ]
          , tasks : ['exec:less']
          , options: {
              livereload: false
            , livereloadOnError: false
            , spawn: false
            , atBegin: true
          }
        }
        , livereload : {
             options: { livereload: true }
          ,  files : [cssF]
        }
      };
      grunt.task.run('watch');
    });
  grunt.registerTask("default", ["_watch"]);
};
