var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
//var babelify = require('balelify');

gulp.task('css', () => {
  gulp.src('css/index.scss')
    .pipe($.plumber())
    .pipe($.sass({
      includePaths: ['./node_modules/bootstrap/dist/css'],
      outputStyle: 'compassed'
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('js', () => {
  gulp.src('js/index.js')
    .pipe($.plumber())
    .pipe($.browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('build', ['js', 'css']);

gulp.task('watch', ['build'], () => {
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./css/**/*.scss', ['css']);
});
