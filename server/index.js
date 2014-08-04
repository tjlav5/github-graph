var express = require('express'),
    logfmt = require('logfmt'),
    gulp = require('gulp'),
    modRewrite = require('connect-modrewrite'),
    serveStatic = require('serve-static'),
    connectLivereload = require('connect-livereload'),
    gulpLivereload = require('gulp-livereload');

var db = require('./models');

var github = require('./github');

var port = Number(process.env.PORT || 5000);
var glob = '.tmp';

module.exports = function () {

  db
  .sequelize
  .sync({})
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      var app = express();

      app.use(logfmt.requestLogger())
        .use(github)
        .use(modRewrite([
          '!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.gif|\\.bmp|\\.woff|\\.ttf|\\.swf|\\.ico$ /index.html [L]'
        ]))
        .use(connectLivereload({port: 35729}))
        .use(serveStatic(glob))
        .listen(port, function () {
          console.log("The magic is happening on " + port);
        });
    }
  })
};
