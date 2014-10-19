var gulp = require( 'gulp' ),
    fs = require( 'fs' ),
    cssmin = require( 'gulp-cssmin' ),
    concat = require( 'gulp-concat' ),
    vendor = require( 'gulp-autoprefixer' ),
    replace = require( 'gulp-replace' ),
    rev = require( 'gulp-rev' ),
    less = require( 'gulp-less' );

// compile LESS to css
gulp.task( 'less', function() {
    return gulp
            .src( 'src/less/main.less' )
            .pipe( less() )
            .pipe( vendor() )
            .pipe( gulp.dest( 'dist/css' ) );
});

// concatenate with vendor files, minify and set version
gulp.task( 'concat:css', [ 'less' ], function() {
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

// replace version in header partial
gulp.task( 'build', [ 'concat:css' ], function() {
    var manifest = JSON.parse( fs.readFileSync( 'rev-manifest.json' ) );
    return gulp
            .src( 'src/includes/header.html' )
            .pipe( replace( 'all.min.css', manifest[ 'all.min.css' ] ) )
            .pipe( gulp.dest( '_includes' ) );
} );

gulp.task( 'watch', [ 'build' ], function( ) {
    return gulp
            .watch( 'src/less/*.less', [ 'build' ] );
});