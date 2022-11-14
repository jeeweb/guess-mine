import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";

const sass = gulpSass(nodeSass);
sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  }
}

function styles() {
  return gulp
    .src(paths.styles.src, {allowEmpty:true})
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
  gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([styles, watchFiles]);

export default dev;