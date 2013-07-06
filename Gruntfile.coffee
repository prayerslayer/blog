module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # concat css files
    concat:
      css:
        src: [
          'css/fonts.css'
          'css/normalize.css'
          'css/simplegrid.css'
          'css/style.css']
        dest: 'css/stylesheet.css'

    # stylus -> css
    stylus:
      compile:
          files:
              'css/style.css': 'css/style.stylus'

    # minify the js
    uglify:
      js:
        files:
          'js/code.min.js': 'js/code.js'

    # minify css
    cssmin:
      css:
        files:
          'css/stylesheet.min.css': 'css/stylesheet.css'

    # watch for changes
    watch:
      css:
        files: ['css/*.stylus']
        tasks: ['stylus:compile', 'concat:css', 'cssmin']

    # simple node server
    connect:
      server:
        options:
          hostname: "0.0.0.0"

    # jekyll
    jekyll:
      server: false

  # Load tasks
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-jekyll'



  # Default task(s).
  grunt.registerTask 'default', ['connect','watch:css']
  grunt.registerTask 'build', [ 'stylus:compile', 'concat:css', 'uglify', 'cssmin']