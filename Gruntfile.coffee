module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    browserify:
      react:
        files: {
          'public/js/App.js': ['public/jsx/redux/containers/App.jsx']
          #'public/js/Auth.js': ['public/jsx/Auth.jsx']
        }

    uglify:
      react:
        options:
          bare: true
        files: {
          'media/js/App.min.js': ['media/js/App.js']
        }

    clean: ['media/js/react']

    env:
      dev:
        NODE_ENV: 'development'
      build:
        NODE_ENV: 'production'

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-env'

  grunt.registerTask 'css', 'cssmin'
  grunt.registerTask 'dev', ['env:dev', 'browserify']
  grunt.registerTask 'build', ['env:build', 'browserify', 'uglify']