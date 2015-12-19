var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
//Server = require('karma').Server,
//sourcesDir = './src/scripts',
//appEntryPoint = "CartApp.js",
//appOutputPoint = "final.js",
//targetDir = './build/',
    zip = require('gulp-zip');

gulp.task('dist', function () {
    return gulp.src(['./src/**/*','./*.js','./*.json','./*.html','./*.md','./routes/*','./views/*','./bin/*'], {
            base: "./"
        })
        .pipe(zip('Tesco-POC.zip'))
        .pipe(gulp.dest('dist'));
});
// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "main.html"
        }
    });
});

gulp.watch(['src/**/*.*', './*.html'], reload);//.watch("src/*.html").on("change", browserSync.reload);
gulp.task('default', ['browser-sync']);
//
//gulp.task('scripts-bfy', function () {
//    return browserify({
//        entries: [path.join(sourcesDir, appEntryPoint)],
//        debug: true
//    }).transform(reactify)
//        .bundle()
//        .pipe(source(appOutputPoint))
//        .pipe(gulp.dest(targetDir));
//});

// jshint files
gulp.task('jshint', function () {
    gulp.src(['/build/final.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});
//
//gulp.task('test', function (done) {
//    new Server({
//        configFile: __dirname + '/public/scripts/__test__/karma.conf.js'
//    }, done).start();
//});
//
//gulp.task('js-watch', ['jshint', 'scripts-bfy'], reload);
//
//gulp.task('default', ['js-watch'], function () {
//    gulp.watch(sourcesDir + "/**/*.js", ['js-watch']);
//});

