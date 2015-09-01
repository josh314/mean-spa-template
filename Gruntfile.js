var configData = require('./server/config/home-data.js');
var clientScripts = configData.dev.scripts.local.map(function(elem) { return 'client/public' + elem; });
var serverScripts = ['server/**/*.js'];
var devScripts = ['scripts/**/*.js', '*.js'];

module.exports = function (grunt) {
  'use strict';
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    //express: 'grunt-express-server',
    ngtemplates: 'grunt-angular-templates',
  });


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lessDir: 'client/public/stylesheets/src',
    cssDir: 'client/public/stylesheets',
    jshint: {
      client: clientScripts,
      server: serverScripts,
      dev: devScripts,
      dirty: [], //Dummy target. On watch event, set to include the touched file.
    },
    less: {
      dev: {
        options: {
          compress: false,
          sourceMap: true,
          sourceMapFilename: '<%=cssDir%>/app.css.map',
          sourceMapURL: '/stylesheets/app.css.map',
          sourceMapBasepath: 'client/public',
          sourceMapRootpath: '/'
        },
        files: { '<%=cssDir%>/app.css': '<%=lessDir%>/main.less'}
      },
      dist: {
        options: {
          compress: true,
          sourceMap: true,
          sourceMapFilename: '<%=cssDir%>/app.min.css.map',
          sourceMapURL: '/stylesheets/app.min.css.map',
          sourceMapBasepath: 'client/public',
          sourceMapRootpath: '/',
          banner: '/*! This is my banner. */ \n'
        },
        files: { '<%=cssDir%>/app.min.css': '<%=lessDir%>/main.less'}
      }
    },
    uglify: {
      client: {
        options: {
          sourceMap: true,
        },
        files: {
          'client/public/js/client.min.js': clientScripts
        }
      }
    },
    ngtemplates: {
      myApp: {
        cwd: 'client/public',
        src: 'partials/*.html',
        dest: 'client/public/js/ng-app-precache.js',
        options: {
          prefix: '/',
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
    },
    watch: {
      partials: {
        files: 'client/public/partials/*.html',
        tasks: ['ngtemplates', 'uglify:client'],
        options: {
          spawn: false,
        },
      },
      serverScripts: {
        files: serverScripts,
        tasks: ['jshint:dirty'],
        //If you need to dynamically modify your config, the spawn option must be disabled to keep the watch running under the same context.
        options: {
          spawn: false,
        },
      },
      clientScripts: {
        files: clientScripts,
        tasks: ['jshint:dirty', 'uglify:client'],
        //If you need to dynamically modify your config, the spawn option must be disabled to keep the watch running under the same context.
        options: {
          spawn: false,
        },
      },
      css: {
        files: '<%=lessDir%>/*.less',
        tasks: ['less'],
      },
    },

  });

  // on watch events configure jshint:dirty to only run on changed file
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.dirty', filepath);
  });

  grunt.registerTask('precache', ['ngtemplates', 'uglify:client']);
  grunt.registerTask('css', ['less:dev', 'less:dist']);
  grunt.registerTask('js:client', ['jshint:client', 'uglify:client']);
  grunt.registerTask('js:server', ['jshint:server']);
  grunt.registerTask('js', ['js:server', 'js:client']);
  grunt.registerTask('build', ['css', 'ngtemplates', 'js']);
  grunt.registerTask('default', ['build', 'watch']);
};
