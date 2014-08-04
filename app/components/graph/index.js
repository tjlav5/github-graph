module.exports = angular.module('editorial-graph.components.graph', [])
.controller('GraphController', require('./controller'))
.directive('graph', require('./directive'));
