//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'); //此工具可以防止watch因为报错而终止监听



//合并多个js并压缩成all.js文件
gulp.task('concatJs', function() {
    return gulp.src(['src/js/jerryAnimate-v2.0.js'])
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(concat('jerryAnimate-min-v2.0.js'))
            .pipe(minify()) //此处会生成两个文件，分别是压缩版和未压缩版
            .pipe(gulp.dest('dist/js'));
});


//定义默认任务
gulp.task('default', ['concatJs']);