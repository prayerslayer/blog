var gulp = require( 'gulp' ),
    fs = require( 'fs' ),

    concat = require( 'gulp-concat' ),
    replace = require( 'gulp-replace' ),
    del = require( 'del' ),

    cssmin = require( 'gulp-cssmin' ),
    vendor = require( 'gulp-autoprefixer' ),
    less = require( 'gulp-less' ),
    rev = require( 'gulp-rev' ),

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
            .pipe( rev.manifest() )
            .pipe( gulp.dest( './') );
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

gulp.task( 'images', [ 'image:jpeg', 'image:gif', 'image:png', 'image:svg'] );

// replace version in header partial
gulp.task( 'build:css', [ 'css' ], function() {
    var manifest = JSON.parse( fs.readFileSync( 'rev-manifest.json' ) );
    return gulp
            .src( 'src/includes/header.html' )
            .pipe( replace( 'all.min.css', manifest[ 'all.min.css' ] ) )
            .pipe( gulp.dest( '_includes' ) );
} );

gulp.task( 'build:images', [ 'images' ] );

gulp.task( 'build', [ 'build:css', 'build:images' ]);

gulp.task( 'watch', [ 'build:css' ], function( ) {
    return gulp
            .watch( 'src/less/*.less', [ 'build:css' ] );
});