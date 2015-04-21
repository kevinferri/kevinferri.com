var gulp = require('gulp');
var uglify = require('gulp-uglify');

// Uglifies/minifies js
gulp.task('minify-js', function() {
  gulp.src('./public/javascripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

// Watches js
gulp.task('watch', function() {
  gulp.watch('./public/javascripts/*.js', ['scripts']);
});

gulp.task('default', ['minify-js', 'watch']);
