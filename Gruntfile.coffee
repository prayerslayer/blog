module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # set environment data
    env:
      dev: {
        "NODE_ENV": "development"
      }
      prod:{
        "NODE_ENV": "production"
      }

    # preprocess files based on environment
    preprocess:
      footer:
        src: '_templates/header.unprocessed.html'
        dest: '_templates/header.html',
      header:
        src: '_templates/footer.unprocessed.html'
        dest: '_templates/footer.html'

    # concat css files
    concat:
      css:
        src: [
          'css/fonts.css'
          'css/normalize.css'
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

    # replace 
    replace: {
      jscss: {
        options: {
          variables: {
            'javascript': '<%= grunt.file.read("js/code.min.js") %>',
            'stylesheet': '<%= grunt.file.read("css/stylesheet.min.css") %>'
          }
        },
        files: [{
          expand: true, 
          flatten: true,
          src: ['_templates/footer.html', '_templates/header.html'],
          dest: '_includes'
          }
        ]
      }
    }
    # watch for changes
    watch:
      css:
        files: ['css/*.stylus']
        tasks: ['stylus:compile', 'concat:css', 'preprocess:header' ]
      js:
        files: ['js/code.js']
        tasks: ['preprocess:footer']

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
  grunt.loadNpmTasks 'grunt-replace'
  grunt.loadNpmTasks 'grunt-jekyll'
  grunt.loadNpmTasks 'grunt-env'
  grunt.loadNpmTasks 'grunt-preprocess'



  # Default task(s).
  grunt.registerTask 'default', ['env:dev', 'preprocess', 'connect', 'watch']
  # build all: compile js, minimize it, copy css together, minimize it, inject both in html
  grunt.registerTask 'build', [ 'env:prod', 'stylus:compile', 'uglify:js', 'concat:css', 'cssmin', 'preprocess', 'replace', 'jekyll']