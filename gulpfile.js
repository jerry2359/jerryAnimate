//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    minify = require('gulp-minify');

//合并多个js并压缩成all.js文件
gulp.task('concatJs', function() {
    return gulp.src(['src/js/jerryAnimate-v2.0.js'])
            .pipe(minify())
            .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['concatJs']);
