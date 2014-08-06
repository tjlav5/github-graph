var d3 = require('d3'),
    d3Tooltip = require('d3-tooltip'),
    lodash = require('lodash');

module.exports = function () {
  return {
    restrict: 'E',
    // template: '<div>HI</div>',
    scope: {
      nodes: '=',
      links: '='
    },
    link: function (scope, elm, attrs) {

      var width = 1000,
          height = 1000;


      var color = d3.scale.category20();

      var force = d3.layout.force()
          .gravity(.05)
          .distance(250)
          .charge(-100)
          // .charge(function(d) { return  -d.level * 10; })
          .size([width, height]);

      var svg = d3.select(elm[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

      var defs = svg.append('defs');

      defs.append('clipPath')
        .attr('id', 'clip-32')
        .attr('pointer-events', 'none')
        .append('circle')
          .attr('r', 16);

      defs.append('clipPath')
        .attr('id', 'clip-48')
        .attr('pointer-events', 'none')
        .append('circle')
          .attr('r', 24);

      defs.append('clipPath')
        .attr('id', 'clip-64')
        .attr('pointer-events', 'none')
        .append('circle')
          .attr('r', 32);

      defs.append('clipPath')
        .attr('id', 'clip-96')
        .attr('pointer-events', 'none')
        .append('circle')
          .attr('r', 48);

      var tooltip = d3Tooltip(d3);

      var circleSizeScale = d3.scale.linear();
      circleSizeScale.domain([0, 1, 2, 3]);
      circleSizeScale.range([96, 64, 48, 32]);

      window.graph = function () {

        force
            .nodes(scope.nodes)
            .links(scope.links)
            .start();

        var link = svg.selectAll(".link")
            .data(scope.links)
          .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node = svg.selectAll(".node")
            .data(scope.nodes)
          .enter()
            .append("g")
              .attr("class", "node")
              .call(force.drag);

        node.append("circle")
          .attr("r", function (d) { return (circleSizeScale(d.group)/2.0) * 1.2; })
          .style("fill", function(d) { return color(d.group); })
          .on("mouseover", function(d) {
            var html = d.name;

            tooltip.html(html)
            tooltip.show()
          })
          .on("mouseout", function () {
            tooltip.hide();
          });

        node.append("image")
          .attr('clip-path', function (d) { return 'url(#clip-' + circleSizeScale(d.group) + ')'; })
          .attr("xlink:href", function (d) { return d.avatar; })
          .attr("x", function (d) { return -(circleSizeScale(d.group)/2.0); })
          .attr("y", function (d) { return -(circleSizeScale(d.group)/2.0); })
          .attr("width", function (d) { return circleSizeScale(d.group); })
          .attr("height", function (d) { return circleSizeScale(d.group); });

        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

      };
    }
  };
};
