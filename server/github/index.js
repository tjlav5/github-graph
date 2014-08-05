var express = require('express');
var db = require('../models');
var Q = require('q');
var request = require('request');
var url = require('url');

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

// GITHUB ROUTES

var app = module.exports = express();

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

app.get('/api/github/authorize', function (req, res) {
  res.send(url.format({
    protocol: 'https',
    hostname: 'github.com',
    pathname: 'login/oauth/authorize',
    query: {
      client_id: '+++++',
      redirect_uri: 'http://localhost:5000/authenticate'
    }
  }));
});

app.post('/api/github/authenticate', function (req, res) {

  var endpoint = 'https://github.com/login/oauth/access_token';

  request.post(endpoint, {
    form: {
      client_id: '+++++',
      client_secret: '+++++',
      code: req.body.code
    },
    json: true
  }, function optionalCallback (err, httpResponse, body) {
    if (err) {
      return console.error('authnetication failed:', err);
    }
    console.log("access_token", body.access_token);
    console.log("scope", body.scope);
    console.log("type", body.token_type);
    res.status(200).end()
  });

});

app.get('/api/github/access_token', function (req, res) {
  // console.group("Authentication Complete");
  console.log("access_token", req.query.access_token);
  console.log("scope", req.query.scope);
  console.log("type", req.query.token_type);
  // console.groupEnd();
});
