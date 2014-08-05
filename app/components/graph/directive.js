var d3 = require('d3'),
    d3Tooltip = require('d3-tooltip'),
    lodash = require('lodash');

var width = 960,
    height = 500;

module.exports = function () {
  return {
    restrict: 'E',
    // template: '<div>HI</div>',
    scope: {
      repos: '='
    },
    link: function (scope, elm, attrs) {
      var color = d3.scale.category20();

      var force = d3.layout.force()
          .gravity(.05)
          .distance(100)
          .charge(-100)
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

      var tooltip = d3Tooltip(d3);

      var circleSizeScale = d3.scale.linear();
      circleSizeScale.domain([0, 1]);
      circleSizeScale.range([48, 32]);

      window.graph = function () {

        var nodes = [],
            links = [];

        nodes.push({
          name: 'tjlav5',
          avatar: 'https://avatars.githubusercontent.com/u/1452216?v=2',
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
            avatar: repo.avatar,
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

          // var tooltip = d3.select("body").append("div")
          //   .attr("class", "tooltip")
          //   .style("opacity", 1e-6);

          var link = svg.selectAll(".link")
              .data(links)
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = svg.selectAll(".node")
              .data(nodes)
            .enter()
              .append("g")
                .attr("class", "node")
                .call(force.drag);
                // .on("mouseover", function(d) {
                //   var html = d.name;
                //
                //   tooltip.html(html)
                //   tooltip.show()
                // })
                // .on("mouseout", tooltip.hide);

          node.append("circle")
            .attr("r", function (d) { return (circleSizeScale(d.group)/2.0) * 1.5; })
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

          // node.append("text")
          //   .attr("dx", 12)
          //   .attr("dy", ".35em")
          //   .text(function(d) { return d.name });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
          //
          // function mouseover(d) {
          //   tooltip.transition()
          //       .duration(500)
          //       .style("opacity", 1)
          //       .text(d.name)
          //       .style("left", (d3.event.pageX - 34) + "px")
          //       .style("top", (d3.event.pageY - 12) + "px");;
          // }
          //
          // function mouseout() {
          //   tooltip.transition()
          //       .duration(500)
          //       .style("opacity", 1e-6);
          // }
        // });
      };
    }
  };
};
