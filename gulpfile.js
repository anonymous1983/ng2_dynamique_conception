var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var browserSync = require('browser-sync');
var superstatic = require('superstatic');
var proxyMiddleware = require('http-proxy-middleware');

var preprocess = require('gulp-preprocess');

var tsProject = tsc.createProject('tsconfig.json');
var config = require('./gulp.config')();


gulp.task('libs', function () {
    return gulp.src(CONFIG.PATHS.lib).pipe(gulp.dest(CONFIG.PATHS.dist.lib));
});

gulp.task('ts-lint', function () {
    return gulp.src(config.allTs)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
})

gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        config.allTs
    ];

    var tsResult = gulp
        .src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('compile-sass', function () {
    var sass = require('gulp-sass');

    var sassCssResult = gulp.src(config.sass.input)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.sass.output))
        .pipe(
            sass({
                outputStyle: 'compressed',
                compress: true
            }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.sass.output));

    return sassCssResult;
});

gulp.task('indexHtml', function () {
    gulp.src('index.src.html')
        .pipe(preprocess({
            context: {
                LIB_PATH: config.build.dev.LIB_PATH,
                BOWER_PATH: config.build.dev.BOWER_PATH,
                HREF: config.build.dev.HREF,
                BASE_URL: config.build.dev.BASE_URL,
                DEBUG: true
            }
        })) //To set environment variables in-line
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
});

gulp.task('serve', ['indexHtml', 'ts-lint', 'compile-ts', 'compile-sass'], function () {

    gulp.watch([config.allTs], ['ts-lint', 'compile-ts']);
    gulp.watch([config.allSass], ['compile-sass']);

    /*var proxy_jasperserver = proxyMiddleware('/bi', {
     target: 'http://rsem-pic',
     logLevel: "debug"
     });*/
    var proxy_jasperserver = proxyMiddleware('/bi', {target: 'http://rsem-pic'});
    //var proxy_rsem = proxyMiddleware('/api', {target: 'http://rsem-pic/epm.passation', logLevel: "debug"});
    var proxy_rsem = proxyMiddleware('/api', {target: 'http://rsem-pic/epm.passation'});

    browserSync({
        port: 5600,
        files: ['./app/**/*.html', './app/**/*.js', './src/**/*.css'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: ['./'],
            middleware: [proxy_jasperserver, proxy_rsem]
        }
    });
});

gulp.task('default', ['serve']);


gulp.task('build-prod', function () {

    var path = require('path');

    gulp
        .src(['!build/', '!node_modules/', 'server/**/*'])
        .pipe(gulp.dest(path.join(PATHS.dist.build, 'server/')));

    gulp
        .src(['!build/', '!node_modules/', 'app/**/*', '!app/**/*.ts', '!app/**/*.js.map'])
        .pipe(gulp.dest(path.join(PATHS.dist.build, 'app/')));

    gulp
        .src(['!build/', '!node_modules/', 'src/**/*', '!src/sass/**/*'])
        .pipe(gulp.dest(path.join(PATHS.dist.build, 'src/')));


    PATHS.lib.forEach(function (lib, index, array) {
        gulp.src(lib.src)
            .pipe(
                gulp.dest(
                    path.join(PATHS.dist.lib, lib.dist)
                )
            )
    });

    gulp.src('index.src.html')
        .pipe(preprocess({
            context: {
                LIB_PATH: config.build.prod.LIB_PATH,
                BOWER_PATH: config.build.prod.BOWER_PATH,
                HREF: config.build.prod.HREF,
                BASE_URL: config.build.prod.BASE_URL,
                DEBUG: true
            }
        })) //To set environment variables in-line
        .pipe(rename('index.html'))
        .pipe(gulp.dest(PATHS.dist.build));

});


var PATHS = {
    dist: {
        build: 'build/',
        lib: 'build/lib/'
    },
    lib: [
        {
            src: 'node_modules/font-awesome/css/**',
            dist: 'font-awesome/css/'
        }, {
            src: 'node_modules/font-awesome/fonts/**',
            dist: 'font-awesome/fonts/'
        }, {
            src: 'node_modules/jquery/dist/jquery.min.js',
            dist: 'jquery/dist'
        }, {
            src: 'node_modules/angular2/bundles/angular2-polyfills.js',
            dist: 'angular2/bundles'
        }, {
            src: 'node_modules/angular2/bundles/angular2.dev.js',
            dist: 'angular2/bundles'
        }, {
            src: 'node_modules/angular2/bundles/router.dev.js',
            dist: 'angular2/bundles'
        }, {
            src: 'node_modules/angular2/bundles/http.dev.js',
            dist: 'angular2/bundles'
        }, {
            src: 'node_modules/systemjs/dist/system.src.js',
            dist: 'systemjs/dist'
        }, {
            src: 'node_modules/rxjs/bundles/Rx.js',
            dist: 'rxjs/bundles'
        }, {
            src: 'node_modules/jquery/dist/jquery.js',
            dist: 'jquery/dist'
        }, {
            src: 'node_modules/jquery-ui/jquery-ui.js',
            dist: 'jquery-ui'
        }, {
            src: 'node_modules/jquery-ui/themes/smoothness/**/*',
            dist: 'jquery-ui/themes/smoothness'
        }, {
            src: 'node_modules/bootstrap/dist/**/*',
            dist: 'bootstrap/dist'
        }, {
            src: 'node_modules/d3/d3.min.js',
            dist: 'd3'
        }, {
            src: 'src/js/c3-0.4.10/c3.min.css',
            dist: 'src/js/c3-0.4.10/'
        }, {
            src: 'src/js/c3-0.4.10/c3.js',
            dist: 'src/js/c3-0.4.10/'
        }
    ]
};
