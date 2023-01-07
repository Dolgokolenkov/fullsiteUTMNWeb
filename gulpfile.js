const { src, dest, watch, parallel } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}


function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}





function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/images/**/*.*'
    ], {base: 'app'})
        .pipe(dest('dist'))
}


function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload)
}


exports.styles = styles;
exports.browsersync = browsersync;
exports.watching = watching;
exports.build = build;

exports.default = parallel(styles,browsersync, watching);
