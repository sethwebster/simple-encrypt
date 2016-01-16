// grab our packages
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint');
    sass        = require('gulp-sass');
    sourcemaps  = require('gulp-sourcemaps');
    concat      = require('gulp-concat');
    gutil       = require('gulp-util')
    livereload  = require('gulp-livereload');

var inputs = {
  'scss'    : "src/scss/**/*.scss",
  'js'      : "src/js/**/*.js",
  'html'    : "src/**/*.html"
};

var outputs = {
  'dist'      : 'dist',
  'css'       : 'dist/assets/css',
  'js'        : 'dist/assets/js',
  'bundlefile': 'enc.js'
}

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src(inputs.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload());
});

gulp.task('build-css', function() {
  return gulp.src(inputs.scss)
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputs.css))
    .pipe(livereload());
});

gulp.task('build-js', function() {
  return gulp.src(inputs.js)
    .pipe(sourcemaps.init())
      .pipe(concat(outputs.bundlefile))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputs.js))
    .pipe(livereload());
});

gulp.task('build-html', function () {
  return gulp.src(inputs.html)
    .pipe(gulp.dest(outputs.dist))
    .pipe(livereload());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(inputs.js, ['jshint', 'build-js']);
  gulp.watch(inputs.scss, ['build-css']);
  gulp.watch(inputs.html, ['build-html']);
});