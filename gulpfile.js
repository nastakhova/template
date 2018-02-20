var gulp = require('gulp'),
    sass = require('gulp-scss'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    sourcemap = require('gulp-sourcemaps'),
    cmq = require('gulp-combine-mq'),
    browserSync = require('browser-sync').create(),
    livereload = require('gulp-livereload'),
    del = require('del');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss', { style: 'expanded' })
    .pipe(sourcemap.init())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sass())
    .pipe(sourcemap.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss', { style: 'expanded' })
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(sourcemap.write())
    
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('dist/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('cmq', function () {
    return gulp.src('dist/css/main.css')
    .pipe(cmq({
        beautify: true
    }))
    .pipe(gulp.dest('dist/css'));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(
          "src/scss/main.scss"
   )
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(cmq({
        beautify: true
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssnano())
    .pipe(concat('main.css'))
    .pipe(gulp.dest("dist/css"));
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});


gulp.task('server', function() {
  browserSync.init({
    server: {
            baseDir: "./dist"
        }
  });
  gulp.watch('src/scss/**/*.scss', ['styles']);

  gulp.watch('src/js/**/*.js', ['scripts']);

  gulp.watch('src/images/*', ['images']);

  browserSync.watch('**/*.*').on('change', browserSync.reload);
});

gulp.task('run', ['server', 'styles', 'images']);
