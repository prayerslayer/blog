module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

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
      js: {
        options: {
          variables: {
            'javascript': '<%= grunt.file.read("js/code.min.js") %>'
          }
        },
        files: [{
          expand: true, 
          flatten: true,
          src: ['_templates/footer.html'],
          dest: '_includes'
          }
        ]
      }
    }
    # watch for changes
    watch:
      css:
        files: ['css/*.stylus']
        tasks: ['stylus:compile', 'concat:css', 'cssmin']
      js:
        files: ['js/code.js']
        tasks: ['uglify:js']

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



  # Default task(s).
  grunt.registerTask 'default', ['connect','watch:css']
  grunt.registerTask 'build', [ 'stylus:compile', 'uglify:js', 'replace:js', 'concat:css', 'cssmin']