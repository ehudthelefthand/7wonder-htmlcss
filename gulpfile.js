const { src, dest, watch } = require('gulp')
const scss = require('gulp-sass')
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()

const scssSrc = './scss/**/*.scss'
const cssOutput = './css'
const baseDir = './'

const cleanCss = () => {
    return src(`${cssOutput}/**/*.css`, { read: false })
        .pipe(clean())
}

const runScss = () => {
    return cleanCss()
        .pipe(src(scssSrc))
        .pipe(scss())
        .pipe(dest(cssOutput))
        .pipe(browserSync.stream())
}

exports.default = () => {
    browserSync.init({
        server: { baseDir }
    })

    watch(scssSrc, runScss)
    watch('./*.html').on('change', browserSync.reload)
}