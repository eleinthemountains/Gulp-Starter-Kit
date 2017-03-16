var gulp = require ('gulp'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require ('gulp-uglify'),
    del = require ('del'),
    rename =require('gulp-rename'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber');
///////////////////////////////////////
//TASKS
//////////////////////////////////////
gulp.task('delete', function(){
    del(['assets/*'], function(err){
        console.log('Files deleted');
    })
})
gulp.task('style', function(){
    return gulp
    .src('css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('assets'));
})
gulp.task('scripts', function(){
    return gulp
    .src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe (jshint())
    .pipe(gulp.dest('assets'));
})
gulp.task('watch',function(){
    gulp.watch('css/*.css', ['style']);
    gulp.watch('js/*.js',['scripts']);
})

gulp.task ('default',['delete','style','scripts','watch']);