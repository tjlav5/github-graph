var d3 = require('d3'),
    lodash = require('lodash');

var width = 960,
    height = 500;

module.exports = function () {
  return {
    restrict: 'E',
    template: '<div>HI</div>',
    scope: {
      repos: '='
    },
    link: function (scope, elm, attrs) {
      var color = d3.scale.category20();

      var force = d3.layout.force()
          .charge(-120)
          .linkDistance(30)
          .size([width, height]);

      var svg = d3.select(elm[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

      window.graph = function () {

        var nodes = [],
            links = [];

        nodes.push({
          name: 'tjlav5',
          group: 0
        });
        links.push({
          source: 0,
          target: 0,
          value: 10
        });

        var i = 1;
        lodash.forEach(scope.repos, function (repo, user) {
          nodes.push({
            name: user,
            group: 1
          });
          links.push({
            source: i,
            target: 0,
            value: 10
          });
          i++;
        });

        // d3.json(scope.repos, function(error, graph) {
          force
              .nodes(nodes)
              .links(links)
              .start();

          var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1e-6);

          var link = svg.selectAll(".link")
              .data(links)
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = svg.selectAll(".node")
              .data(nodes)
            .enter()
              .append("svg:circle")
                .attr("class", "node")
                .attr("r", 5)
                .style("fill", function(d) { return color(d.group); })
                .call(force.drag)
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);

          node.append("title")
              .text(function(d) { return d.name; });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
          });

          function mouseover(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 1)
                .text(d.name)
                .style("left", (d3.event.pageX - 34) + "px")
                .style("top", (d3.event.pageY - 12) + "px");;
          }

          function mouseout() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 1e-6);
          }
        // });
      };
    }
  };
};
