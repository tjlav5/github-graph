var Q = require('q'),
    gulp = require('gulp'),
    htmlReplace = require('gulp-html-replace');

module.exports = function () {
  var deferred = Q.defer();
  gulp.src('app/index.html')
    .pipe(htmlReplace({
      'github_graph_js': '/github-graph.min.js',
      'github_graph_css': '/github-graph.min.css',
      'vendor_js': '/vendor.min.js'
    }))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    })
  return deferred.promise;
};
