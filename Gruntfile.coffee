module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    browserify:
      react:
        files: {
          'public/js/App.js': ['public/jsx/redux/containers/TodoList.jsx']
          #'public/js/Auth.js': ['public/jsx/Auth.jsx']
        }

    uglify:
      react:
        options:
          bare: true
        files: {
          'public/js/App.min.js': ['public/js/TodoList.js']
        }

    clean: ['public/js/react']

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-browserify'

  grunt.registerTask 'css', 'cssmin'
  grunt.registerTask 'dev', ['browserify']
  grunt.registerTask 'build', ['browserify', 'uglify']