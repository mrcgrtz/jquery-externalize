/* eslint-env es6, node */
const gulp = require( "gulp" );
const qunit = require( "gulp-qunit" );

gulp.task( "test", () => gulp.src( "./test/index.html" ).pipe( qunit() ) );
