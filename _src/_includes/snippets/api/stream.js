// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('scss/styles.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Provide `once: true` to restrict reloading to once per stream
gulp.task('templates', function () {
    return gulp.src('*.jade')
        .pipe(jade())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream({once: true}));
});

// Provide filter unwanted files from being reloaded by providing
// a match option
gulp.task('less', function () {
    return gulp.src('*.less')
        .pipe(jade())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({match: "*.css"}));
});

