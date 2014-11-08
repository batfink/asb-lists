var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('copy:tabletop', function() {
    gulp.src('bower_components/tabletop/src/tabletop.js').pipe(gulp.dest('www/lib'));
});

gulp.task('copy:es6-promise', function() {
    gulp.src('bower_components/es6-promise/promise.js').pipe(gulp.dest('www/lib'));
});

gulp.task('copy:document-register-element', function() {
    gulp.src('node_modules/document-register-element/build/document-register-element.js').pipe(gulp.dest('www/lib'));
});

gulp.task('setup', ['copy:tabletop', 'copy:es6-promise', 'copy:document-register-element']);

gulp.task('default', ['setup'], function() {
    browserSync({
        server: {
            baseDir: './www'
        }
    });

    gulp.watch(['www/**/*'], reload);
    gulp.watch(['bower_components'])

});
