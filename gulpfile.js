/* Variables */

const { src, dest, watch, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));

// Imagenes
const imagemin = require('gulp-imagemin');

// Purge css

const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
function css( done ) {
    // Identificar el archivo principal
    
    src('src/scss/app.scss')
        .pipe( sass() )// Compilar sass
        .pipe( dest('build/css') )// Exportarlo o guardarlo en una ubicación

    done();
}

function cssbuild( done ) {
    src('build/css/app.css')// lee el archivo
    .pipe( rename({
        suffix: '.min'
    }))
    .pipe(purgecss ({
        content: ['index.html']
    }))
    .pipe ( dest('build/css') )
    done();
}

function dev( ) {
    watch('src/scss/**/*.scss', css); // va a revisar los cambios en los diferentes archivos y carpetas
}

function imagenes(done) {
    src('src/img/**/*') // va a revisar los archivos dentro de la carpeta
        .pipe( imagemin({optimizationLevel: 3}) )
        .pipe( dest('build/img') ) // Exportarlo o guardarlo en una ubicación
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev );
exports.build = series( cssbuild );