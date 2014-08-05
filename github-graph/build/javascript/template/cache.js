var path = require('path'),
    Q = require('q'),
    gulp = require('gulp'),
    angularTemplatecache = require('gulp-angular-templatecache');

module.exports = function () {

  var deferred = Q.defer();

  gulp.src('app/components/**/*.html')
    .pipe(angularTemplatecache('github-graph.tpl.js', {
      module: 'github-graph.templates',
      standalone: true,
      root: ['/', 'components'].join('')
    }))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  return deferred.promise;

};
