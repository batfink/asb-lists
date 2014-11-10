var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var deploy = require('gulp-gh-pages');

var dependencies = [
    'bower_components/tabletop/src/tabletop.js',
    'bower_components/es6-promise/promise.js',
    'node_modules/document-register-element/build/document-register-element.js'
];

gulp.task('setup', function() {
    gulp.src(dependencies).pipe(gulp.dest('www/lib'));
});

gulp.task('default', ['setup'], function() {
    browserSync({
        server: {
            baseDir: './www'
        }
    });

    gulp.watch(['www/**/*'], reload);
    gulp.watch(['bower_components'])

});

gulp.task('deploy', function () {
    return gulp.src('./www/**/*')
        .pipe(deploy());
});
