// Include Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();


// Lint
gulp.task('lint', function() {
    return gulp.src('build/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.notify(function(file) {
            var jshint = plugins.jshint;
            if (file.jshint.success) {
                // Don't show something if success 
                return false;
            }

            var errors = file.jshint.results.map(function(data) {
                if (data.error) {
                    return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join("\n");
            return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Concat .js-files and uglify - save to dist
gulp.task('scripts', ['lint'], function() {
    return gulp.src('build/js/*.js')
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(plugins.notify('Scripts have been updated'))
        .pipe(plugins.livereload());
});

// Sass, autoprefix and minify CSS 
gulp.task('styles', function() {
    return plugins.rubySass('build/style/src/style.scss')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('build/style'))
        .pipe(plugins.csso())
        .pipe(gulp.dest('dist/style'))
        .pipe(plugins.notify('Styles have been successfully updated'))
        .pipe(plugins.livereload());
});

// Optimize images
gulp.task('imagemin', function() {
	return gulp.src('imgraw/*')
	.pipe(plugins.imagemin())
	.pipe(gulp.dest('images'))
	.pipe(plugins.notify('Images have been optimized'))
    .pipe(plugins.livereload());
});

// Watch task
gulp.task('watch', function() {
	plugins.livereload.listen();

	gulp.watch('build/js/*.js', ['scripts']);
	gulp.watch('build/style/src/*.scss', ['styles']);
	gulp.watch('imgraw/*', ['imagemin']);
});

// Default task
gulp.task('default', ['scripts', 'styles', 'imagemin', 'watch']);
   

// Livereload code for functions.php in wordpress
/*
function eden_livereload() {
    if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
      wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
      wp_enqueue_script('livereload');
    }
}
*/