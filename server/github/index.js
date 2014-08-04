var express = require('express');
var app = module.exports = express();
var db = require('../models');
var Q = require('q');

var GitHubApi = require('github'),
    github = new GitHubApi({
      // required
      version: "3.0.0",
      // optional
      debug: true
    });

var authenticate = function (key) {
  var deferred = Q.defer();
  github.authenticate({
    type: 'oauth',
    token: key
  });
  deferred.resolve();
  return deferred;
};

app.get('/api/github/:user/followers', function (req, res) {

  db.Key.find({where: {service: 'github'}}).success(function (key) {
    try{
      authenticate(key.get('key'));
      github.user.getFollowingFromUser({
        user: req.params.user
      }, function (err, followers) {
        res.send(followers);
      });
    } catch (e) {
      console.log(e);
    }
  });

});

app.get('/api/github/:user/repos', function (req, res) {

  db.Key.find({where: {service: 'github'}}).success(function (key) {
    try{
      authenticate(key.get('key'));
      github.repos.getFromUser({
        user: req.params.user
      }, function (err, repos) {
        res.send(repos);
      });
    } catch (e) {
      console.log(e);
    }
  });

});

app.get('/api/github/:user/:repo/languages', function (req, res) {

  db.Key.find({where: {service: 'github'}}).success(function (key) {
    try{
      authenticate(key.get('key'));
      github.repos.getLanguages({
        user: req.params.user,
        repo: req.params.repo
      }, function (err, languages) {
        delete languages.meta;
        res.send(languages);
      });
    } catch (e) {
      console.log(e);
    }
  });

});
