var express = require('express'),
    logfmt = require('logfmt'),
    gulp = require('gulp'),
    modRewrite = require('connect-modrewrite'),
    serveStatic = require('serve-static'),
    connectLivereload = require('connect-livereload'),
    gulpLivereload = require('gulp-livereload'),
    server = require('../../server'),
    buildTask = require('../build');

// var pg = require('knex')({
//   client: 'pg',
//   connection: 'postgres://ohkyhypfimmlfi:SVPKdomWhFcOObhtub4imWwp5d@ec2-54-83-204-78.compute-1.amazonaws.com:5432/dds414hn2sbcd1?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory'
//   // connection: process.env.DATABASE_URL
// });
// var bookshelf = require('bookshelf')(pg);

// var app = express();
//
// // app.set('bookshelf', bookshelf);
//
// var github = require('../../server/github');
//
// var port = Number(process.env.PORT || 5000);
// var glob = '.tmp';
//
// // var GitHubApi = require('github'),
// //     github = new GitHubApi({
// //       // required
// //       version: "3.0.0",
// //       // optional
// //       debug: true
// //     });
//
// // var app = express()
// app.use(logfmt.requestLogger())
//   .use(github)
//   .use(modRewrite([
//     '!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.gif|\\.bmp|\\.woff|\\.ttf|\\.swf|\\.ico$ /index.html [L]'
//   ]))
//   .use(connectLivereload({port: 35729}))
//   .use(serveStatic(glob))
//   .listen(port, function () {
//     console.log("The magic is happening on " + port);
//   });

server();

var reload = gulpLivereload();

gulp.watch('app/**').on('change', function(file) {
  console.log('change detected', file);
  buildTask().then(function () {
   reload.changed(file.path);
  });
});

// var pg = require('knex')({
//   client: 'pg',
//   connection: 'postgres://ohkyhypfimmlfi:SVPKdomWhFcOObhtub4imWwp5d@ec2-54-83-204-78.compute-1.amazonaws.com:5432/dds414hn2sbcd1?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory'
//   // connection: process.env.DATABASE_URL
// });
// var bookshelf = require('bookshelf')(pg);

// var Key = bookshelf.Model.extend({
//   tableName: 'keys'
// });

// Keys.fetchAll().then(function (collection) {
//   console.log(collection);
// });

// new Key({'service': 'github'})
//   .fetch()
//   .then(function(model) {
//     // outputs 'Slaughterhouse Five'
//     // console.log(model.get('key'));
//
//     var GitHubApi = require('github');
//
//     var github = new GitHubApi({
//         // required
//         version: "3.0.0",
//         // optional
//         debug: true
//         // protocol: "https",
//         // host: "api.github.com",
//         // pathPrefix: "/api/v3", // for some GHEs
//         // timeout: 5000
//     });
//
//     github.authenticate({
//         type: "oauth",
//         token: model.get('key')
//     });
//
//     github.repos.getAll({
//         // optional:
//         // headers: {
//         //     "cookie": "blahblah"
//         // },
//         // user: "tjlav5"
//     }, function(err, res) {
//         console.log(JSON.stringify(res));
//     });
//
//   });

// var GitHubApi = require('github');
//
// var github = new GitHubApi({
//     // required
//     version: "3.0.0",
//     // optional
//     debug: true
//     // protocol: "https",
//     // host: "api.github.com",
//     // pathPrefix: "/api/v3", // for some GHEs
//     // timeout: 5000
// });
//
// github.authenticate({
//     type: "oauth",
//     token: accessToken
// });
//
// github.user.getFollowingFromUser({
//     // optional:
//     // headers: {
//     //     "cookie": "blahblah"
//     // },
//     user: "tjlav5"
// }, function(err, res) {
//     console.log(JSON.stringify(res));
// });
