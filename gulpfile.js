var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var deploy = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});


var dependencies = [
    'bower_components/tabletop/src/tabletop.js',
    'bower_components/es6-promise/promise.js',
    'node_modules/markdown/lib/markdown.js',
    'bower_components/jsonml/jsonml-html.js'
];

gulp.task('setup', function() {
    gulp.src(dependencies).pipe(gulp.dest('www/lib'));
});

gulp.task('compress', function() {
    dependencies.push('www/script.js');
    gulp.src(dependencies).pipe(concat('asb.all.min.js')).pipe(uglify()).pipe(gulp.dest('www/lib'));
});

gulp.task('default', ['setup'], function() {
    browserSync({
        server: {
            baseDir: './www'
        }
    });

    gulp.watch(['www/**/*'], reload);

});

gulp.task('deploy', function () {
    return gulp.src('./www/**/*')
        .pipe(deploy());
});
