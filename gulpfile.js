const gulp = require('gulp'),
      gutil = require('gulp-util'),
      sass = require('gulp-ruby-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      webserver = require('gulp-webserver');

gulp.task('js', ()=> {
  gulp.src('components/scripts/script.js')
    .pipe(gulp.dest('builds/development/js/'))
});

gulp.task('sass', ()=> {
  return sass('components/sass/style.scss', {
    sourcemap: true,
    style: 'expanded'
  })
  .on('error', (err)=> {
    console.error('Error!', err.message)
  })
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', ()=> {
  gulp.watch(['components/scripts/**/*'], ['js'])
  gulp.watch(['components/sass/**/*'], ['sass'])
  gulp.watch(['builds/development/*.html'])
});

gulp.task('webserver', ()=> {
  gulp.src('builds/development/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['sass', 'watch', 'js', 'webserver']);