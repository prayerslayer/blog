module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # set environment data
    env:
      dev: 
        'NODE_ENV': 'development'
      prod:
        'NODE_ENV': 'production'

    # preprocess files based on environment. that is: inlining css (prod) or reference stylesheet (dev)
    preprocess:
      header:
        src: '_templates/header.unprocessed.html'
        dest: '_includes/header.html'

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
      img:
        files: ['media/img/*']
        tasks: ['imgmin']

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
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-jekyll'
  grunt.loadNpmTasks 'grunt-env'
  grunt.loadNpmTasks 'grunt-preprocess'


  # Default task(s).
  grunt.registerTask 'default', ['env:dev', 'preprocess', 'connect', 'watch']
  # build all: compile js, minimize it, copy css together, minimize it, inject both in html
  grunt.registerTask 'build', [ 'env:prod', 'stylus:compile', 'concat:css', 'cssmin', 'preprocess' ]