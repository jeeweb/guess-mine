import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";

const sass = gulpSass(nodeSass);

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles.css"
  }
}

export function styles() {
  return gulp
    .src(paths.styles.src, {allowEmpty:true})
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
}
