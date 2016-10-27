'use strict';

/**
 *  Here is the app build config
 */
var THEME_NAME = 'default';
var COMPONENTS_LIST = ['dialog'];

/**************************************/


var gulp = require('gulp');//gulp构建基础
var clean = require('gulp-rimraf');//清空文件夹
var sourcemaps = require('gulp-sourcemaps');//sourcemaps工具
var sass = require('gulp-sass');//编译sass
var uglify = require('gulp-uglify');//压缩js
var concat = require('gulp-concat');//合并文件
var connect = require('gulp-connect');//创建服务
var template = require('gulp-template');//静态模板内容替换
var autoprefixer = require('gulp-autoprefixer');

var frameworkPaths = {
    jsPath: [
        'framework/js/lib/angular.js',
        'framework/js/lib/angular-ui-router.js',
        'framework/js/lib/md5.js',
        'framework/js/lib/hex_sha1.js',
        'framework/js/baseApp.js',
        'framework/js/provider/**/*.js'
    ],
    sassPath: [
        'framework/*.scss'
    ],
    fontPath: ['framework/sass/fontIcon/*']
};

var debugPaths = {
    jsPath: [
        'framework/js/debugLib/vconsole.min.js'
    ]
};

var componentsPaths = {
    configJsPath: ['config/**/*.js'],
    directiveJsPath: ['components/directive/**/*.js'],
    filterJsPath: ['components/filter/**/*.js'],
    providerJsPath: ['components/provider/**/*.js'],
    sassPath: ['components/components.scss']
};

var appPaths = {
    appJsPath: [
        'app/app.js',
        'app/config/**/*.js',
        'app/modules/**/*.js'
    ],
    modulesJsPath: ['app/**/*.js'],
    sassPath: ['app/modules/*.scss'],
    imagePath: ['app/images/**/*']
};

var viewPath = [
    '{app,components,framework}/**/*.html',
    'index.html'
];

var docPath = {
    docJsPath: ['doc/**/*.js'],
    docSassPath: ['doc/doc.scss'],
    viewPath: [
        '{doc, config}/**/*.html', 'doc.html'
    ]
};

/**
 * 清除当前目录
 */
gulp.task('clean', function (callback) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return gulp.src(['dist/', 'rev/'], {read: false})
        .pipe(clean());
});

/**
 * 构建framework-css
 */
gulp.task('framework-sass', function () {
    return gulp.src(frameworkPaths.sassPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/framework/'));
});
gulp.task('framework-sass-debug', function () {
    return gulp.src(frameworkPaths.sassPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/framework/'));
});
gulp.task('font-icon', function () {
    return gulp.src(frameworkPaths.fontPath)
        .pipe(gulp.dest('dist/framework/fontIcon/'));
});
/**
 * 构建framework -js
 */
gulp.task('framework-js', function () {
    return gulp.src(frameworkPaths.jsPath)
        .pipe(concat('framework.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/framework/'));
});
gulp.task('framework-js-debug', function () {
    return gulp.src(frameworkPaths.jsPath.concat(debugPaths.jsPath))
        .pipe(sourcemaps.init())
        .pipe(concat('framework.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/framework/'));
});
/**
 * 构建component-provider-js
 */
gulp.task('components-provider', function () {
    for (var i = 0, length = COMPONENTS_LIST.length; i < length; i++) {
        gulp.src('components/provider/' + COMPONENTS_LIST[i] + '/**/*.js')
            .pipe(concat(COMPONENTS_LIST[i] + '.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/components/provider/' + COMPONENTS_LIST[i] + '/'));
        // gulp.src('components/provider/' + COMPONENTS_LIST[i] + '/' + COMPONENTS_LIST[i] + '.scss')
        //     .pipe(template({THEME_NAME: THEME_NAME}))
        //     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //     .pipe(gulp.dest('dist/components/provider/' + COMPONENTS_LIST[i] + '/'));
    }
    return true;
});
gulp.task('components-provider-debug', function () {
    for (var i = 0, length = COMPONENTS_LIST.length; i < length; i++) {
        gulp.src('components/provider/' + COMPONENTS_LIST[i] + '/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat(COMPONENTS_LIST[i] + '.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/components/provider/' + COMPONENTS_LIST[i] + '/'));
        // gulp.src('components/provider/' + COMPONENTS_LIST[i] + '/' + COMPONENTS_LIST[i] + '.scss')
        //     .pipe(template({THEME_NAME: THEME_NAME}))
        //     .pipe(sourcemaps.init())
        //     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //     .pipe(sourcemaps.write())
        //     .pipe(gulp.dest('dist/components/provider/' + COMPONENTS_LIST[i] + '/'));
    }
    return true;
});
/**
 * 构建components-directive-filter-provider
 */
gulp.task('components-js', function () {
    gulp.src(componentsPaths.directiveJsPath.concat(componentsPaths.filterJsPath.concat(componentsPaths.configJsPath.concat(componentsPaths.providerJsPath))))
        .pipe(concat('components.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/components/'));
});
gulp.task('components-js-debug', function () {
    gulp.src(componentsPaths.directiveJsPath.concat(componentsPaths.filterJsPath.concat(componentsPaths.configJsPath.concat(componentsPaths.providerJsPath))))
        .pipe(sourcemaps.init())
        .pipe(concat('components.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/components/'));
});
gulp.task('components-sass', function () {
    //gulp.src(componentsPaths.directiveSassPath.concat(componentsPaths.filterSassPath))
    gulp.src(componentsPaths.sassPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(concat('components.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/components/'));
});
gulp.task('components-sass-debug', function () {
    //gulp.src(componentsPaths.directiveSassPath.concat(componentsPaths.filterSassPath))
    gulp.src(componentsPaths.sassPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(concat('components.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/components/'));
});
/**
 * 构建app -js
 */
gulp.task('app-js', function () {
    return gulp.src(appPaths.appJsPath)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/app/'));
});
gulp.task('app-js-debug', function () {
    return gulp.src(appPaths.appJsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/app/'));
});
/**
 * 构建app-sass
 */
gulp.task('app-sass', function () {
    return gulp.src('app/app.scss')
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/app/'));
});
gulp.task('app-sass-debug', function () {
    return gulp.src('app/app.scss')
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/app/'));
});

/**
 * 构建images
 */
gulp.task('app-images', function () {
    return gulp.src(appPaths.imagePath)
        .pipe(gulp.dest('dist/app/images/'));
});

/**
 * 构建html
 */
gulp.task('html', function () {
    return gulp.src(viewPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(gulp.dest('dist/'));
});
/**
 * 编译doc
 */
gulp.task('doc-html', function () {
    return gulp.src(docPath.viewPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(gulp.dest('dist/'));
});
gulp.task('doc-js', function () {
    return gulp.src(docPath.docJsPath)
        .pipe(concat('doc.js'))
        .pipe(gulp.dest('dist/doc/'));
});
gulp.task('doc-sass', function () {
    return gulp.src(docPath.docSassPath)
        .pipe(template({THEME_NAME: THEME_NAME}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/doc/'));
});
/**
 * 所有资源编译
 */
gulp.task('sourceBuild', ['font-icon', 'framework-sass', 'framework-js', 'app-js', 'app-sass', 'app-images', 'components-provider', 'components-js', 'components-sass', 'html'], function () {
});
gulp.task('sourceBuild-debug', ['font-icon', 'framework-sass-debug', 'framework-js-debug', 'app-js-debug', 'app-sass-debug', 'app-images', 'components-provider-debug', 'components-js-debug', 'components-sass-debug', 'html', 'doc-html', 'doc-js', 'doc-sass'], function () {
});
gulp.task('build', ['clean'], function () {
    return gulp.start('sourceBuild');
});

gulp.task('debug', ['clean'], function () {
    return gulp.start('sourceBuild-debug');
});

gulp.task('default', function () {
    return gulp.start('build');
});
gulp.task('fileWatch', ['debug'], function () {
});

gulp.task('serve', function () {
    gulp.start('debug');
    connect.server({
        livereload: true,
        root: './dist',
        port: 30000
    });
    gulp.watch(['./app/**/*.*', './doc/**/*.*', './components/**/*.*', './framework/**/*.*', './config/**/*.*', './gulpfile.js', 'index.html'], ['fileWatch']);
});
