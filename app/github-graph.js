// var router = require('angular-ui-router');

var app = angular.module('github-graph', [
  'ui.router',
  'github-graph.templates',
  require('./components/connect').name,
  require('./components/graph').name
])
.config(require('./states'));
