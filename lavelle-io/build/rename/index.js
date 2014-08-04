var Q = require('q'),
    gulp = require('gulp'),
    htmlReplace = require('gulp-html-replace');

module.exports = function () {
  var deferred = Q.defer();
  gulp.src('app/index.html')
    .pipe(htmlReplace({
      'github_graph_js': 'github-graph.min.js',
      'vendor_js': 'vendor.min.js'
    }))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    })
  return deferred.promise;
};
