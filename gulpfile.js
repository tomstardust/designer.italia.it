'use strict';

var fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  del = require('del'),
  browserSync = require('browser-sync'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  runSequence = require('run-sequence'),
  merge = require('merge-stream'),
  config = require('./config')
  ;

var $ = gulpLoadPlugins();

gulp.task('templates:pages', function () {
  // uses minified templates if present
  var templateDir = fs.existsSync('dist/' + config.templates.dir) ?
    'dist/' + config.templates.dir : config.templates.dir;

  // var root = {};
  return gulp.src('pages/**/*.md')
    .pipe($.frontMatter({
      property: 'data',
      remove: true
    }))
    .pipe($.data(function (e) {
      return {
        'config': config,
        'site': config.site,
        'templateDir': templateDir
      };
    }))
    // .pipe(vartree({
    //   root: root,
    //   prop: 'data'
    // }))
    .pipe($.markdown())
    .pipe($.applyTemplate({
      engine: 'nunjucks',
      context: { /* nunjucks options */},
      template: function (context, file) {
        return path.join(templateDir, context.data.template);
      }
    }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest('dist/' + config.site.htmlDir));
});

gulp.task('templates:dev', ['templates:pages'], function () {
  // move index out pages directory
  return gulp.src('dist/' + config.site.htmlDir + '/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('templates:prod', function () {
  runSequence('minify', 'templates:dev');
});

gulp.task('minify', ['scripts', 'styles'], function () {
  var assets = $.useref.assets({searchPath: ['dist']});
  return gulp.src('template/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // @FIXME IE8
    .pipe($.if('*.css', $.minifyCss({compatibility: 'ie8'})))
    .pipe($.rev())
    .pipe(gulp.dest('dist'))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace({prefix: config.site.baseurl}))
    .pipe(gulp.dest('dist/template'));
});

gulp.task('images', function () {
  return gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
    ;
});

gulp.task('webroot', function () {
  return merge(gulp.src([
    'bower_components/**/*'], {base: './', dot: true})
    .pipe(gulp.dest('dist')),
    gulp.src(['web/**/*'], {dot: true})
    .pipe(gulp.dest('dist')));
});

gulp.task('fonts', function () {
  return gulp.src(['bower_components/bootstrap-sass/assets/fonts/**'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function () {
  return gulp.src(['styles/main.scss'])
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 1%'],
      cascade: true,
      remove: false
    }))
    // px to rem (disabled)
    .pipe($.if('*.css_', $.pxtorem({
      prop_white_list: [],
      root_value: 10,
      replace: false,
      selector_black_list: ['body', 'html']
    })))
    //  rem to px
    .pipe($.if('*.css', $.pixrem({
      rootValue: 10,
      replace: false
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
  return gulp.src(['./scripts/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.min.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('clean', function () {
  return del.sync(['dist/*', '!dist/.git'], {dot: true});
});

gulp.task('build:dev', ['scripts', 'fonts', 'styles',
  'templates:dev', 'webroot', 'images']);

gulp.task('build:prod', ['scripts', 'fonts', 'styles',
  'templates:prod', 'webroot', 'images']);

gulp.task('serve', ['clean', 'build:dev', 'archive'], function () {
  browserSync(Object.assign({}, {
    notify: false,
    logPrefix: 'BrowserSync',
    scrollElementMapping: ['main'],
    'server': ['dist']
  }, config.browserSync));
  gulp.watch(['pages/**/*', 'template/**/*'], ['templates:dev', browserSync.reload]);
  gulp.watch(['styles/**/*'], ['styles', browserSync.reload]);
  gulp.watch(['scripts/**/*'], ['scripts', browserSync.reload]);
  gulp.watch(['images/**/*'], browserSync.reload);
});

gulp.task('default', ['serve']);

//gulp.task('deploy', function () {
//  return gulp.src('dist/**')
//    .pipe($.scp({
//      host: config.deploy.host,
//      user: config.deploy.username,
//      port: config.deploy.port,
//      path: config.deploy.dir
//    }));
//});

/*
 * @FIXME: linkare allo zip del repository una volta creata
 */
gulp.task('archive', function () {
  return gulp.src(['web/assets/agid-bootstrap/**',
    '!**/build{,/**}',
    '!**/bower_components{,/**}',
    '!**/node_modules{,/**}'],
    {base: './web/assets'}
  )
    .pipe($.zip('agid-bootstrap.zip'))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('deploy', ['clean', 'build:prod', 'archive'], function () {
  return gulp.src(['./dist/**/*', '!./dist/bower_components{,/**}', '!./dist/template{,/**}'])
    .pipe($.file('CNAME', config.deploy.cname))
    .pipe($.ghPages({ remoteUrl: config.deploy.repository }));
});

