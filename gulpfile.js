var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    banner = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''].join('\n');

gulp.task('style', function() {
    return gulp.src('src/scss/rwsmith-grids.scss')
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            .pipe(minifyCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(header(banner, { pkg : pkg } ))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('default', ['style', 'html'], function() {
    livereload.listen();
    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch('src/index.html', ['html']);
});