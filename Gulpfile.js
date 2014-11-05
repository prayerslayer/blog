var gulp = require( 'gulp' ),
    fs = require( 'fs' ),
    shell = require( 'gulp-shell' ),

    concat = require( 'gulp-concat' ),
    replace = require( 'gulp-replace' ),
    del = require( 'del' ),

    cssmin = require( 'gulp-cssmin' ),
    vendor = require( 'gulp-autoprefixer' ),
    less = require( 'gulp-less' ),
    rev = require( 'gulp-rev' ),

    uglify = require( 'gulp-uglify' ),

    imagemin = require( 'gulp-imagemin' );

// compile LESS to css
gulp.task( 'less', [ 'delete:css' ], function() {
    return gulp
            .src( 'src/less/main.less' )
            .pipe( less() )
            .pipe( vendor() )
            .pipe( gulp.dest( 'dist/css' ) );
});

gulp.task( 'delete:css', function( done ) {
    del( 'dist/css', done );
});

// concatenate with vendor files, minify and set version
gulp.task( 'css', [ 'less' ], function() {
    return gulp
            .src([
                'src/css/normalize-3.0.2.css',
                'src/css/fonts.css',
                'dist/css/main.css'
            ])
            .pipe( concat( 'all.min.css' ) )
            .pipe( cssmin() )
            .pipe( rev () )
            .pipe( gulp.dest( 'dist/css' ) )
            .pipe( rev.manifest({
                path: 'rev-manifest.json'
            }) )
            .pipe( gulp.dest( './') );
});

gulp.task( 'build:js', function() {
    return gulp
            .src( 'src/js/*.js' )
            .pipe( concat( 'all.min.js' ) )
            .pipe( uglify() )
            .pipe( gulp.dest( 'dist/js' ) );
});

gulp.task( 'image:jpeg', function() {
    return gulp
            .src( 'media/img/**/*.jpg' )
            .pipe( imagemin() )
            .pipe( gulp.dest( 'media/img' ) );
});

gulp.task( 'image:png', function() {
    return gulp
            .src( 'media/img/**/*.png' )
            .pipe( imagemin() )
            .pipe( gulp.dest( 'media/img' ) );
});

gulp.task( 'image:gif', function() {
    return gulp
            .src( 'media/img/**/*.gif' )
            .pipe( imagemin() )
            .pipe( gulp.dest( 'media/img' ) );
});

gulp.task( 'image:svg', function() {
    return gulp
            .src( 'media/img/**/*.svg' )
            .pipe( imagemin() )
            .pipe( gulp.dest( 'media/img' ) );
});

gulp.task( 'jekyll', [ 'build:css'], shell.task( 'jekyll build' ) );

gulp.task( 'images', [ 'image:jpeg', 'image:gif', 'image:png', 'image:svg'] );

// replace version in header partial
gulp.task( 'build:css', [ 'css' ], function() {
    var manifest = JSON.parse( fs.readFileSync( 'rev-manifest.json' ) );
    return gulp
            .src( 'src/includes/header.html' )
            .pipe( replace( 'all.min.css', manifest[ 'all.min.css' ] ) )
            .pipe( gulp.dest( '_includes' ) );
});

gulp.task( 'build:images', [ 'images' ] );

gulp.task( 'build', [ 'build:css', 'build:images', 'build:js' ]);

gulp.task( 'publish', function() {
    var rawCmd = [
        // cmd
        'aws s3 sync',
        // src
        '_site',
        // target = bucket
        's3://npiccolotto-com/',
        // options
        // npm deps
        '--exclude "node_modules/*"',
        // source files
        '--exclude "src/*"',
        // delete gone files
        '--delete'
    ];

    var cmd = rawCmd.join( ' ' );
    return shell.task( cmd )();
});

gulp.task( 'watch', [ 'build:css' ], function( ) {
    shell.task( 'node server.js' )();
    return gulp
            .watch([
                'src/less/*.less',
                'src/includes/*.html' ],

                [ 'build:css', 'jekyll' ] );
});