const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');

gulp.task('static:dev', () => {
  return gulp.src(['app/**/*.html', 'app/**/*.png'])
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('sass:dev', () => {
  return gulp.src('app/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'));
});

gulp.task('build:dev', ['static:dev', 'webpack:dev', 'sass:dev']);

gulp.task('default', ['build:dev']);
