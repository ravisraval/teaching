import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

class D3Play extends React.Component {
  constructor() {
    super();
    this.state = {
      //it really doesn't matter what you put in here
      width: 420,
      height: 420
    };
    //best practice to bind functions in the constructor
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  // *magic* we take the div sourrounding the svg and set it's with/height to be the with/height of our SVG
  updateDimensions() {
    const el = this.refs.chart;
    this.setState({ width: el.offsetWidth, height: el.offsetHeight });
  }
  //fireing our function and adding the event listener
  componentDidMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  //removing the event listener
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  drawChart() {
    //here we set our width and height to be the width and height calculated in the state in updateDimensions()
    let {width, height} = this.state;

    // we create the faux element
    let el = new ReactFauxDOM.Element('div');

    d3.select(el).append('svg')
    .attr("width", 300)
    .attr("height", 900)

    var nodes = [].concat(
      d3.range(80).map(function() { return {type: "a"}; }),
      d3.range(160).map(function() { return {type: "b"}; })
    );

    var node = d3.select("svg")
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 2.5)
        .attr("fill", function(d) { return d.type === "a" ? "brown" : "steelblue"; })

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceCollide().radius(5))
        .force("r", d3.forceRadial(function(d) { return d.type === "a" ? 100 : 200; }))
        .on("tick", ticked);

    function ticked() {
      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }
    // we set ref on our newly created element


    // the rest of our chart would go here

    el.setAttribute("ref", "chart");

    //then we give the result back to react to render it
    return el.toReact();
  }

  render() {
    return (
       this.drawChart()
    )
  }
};

export default D3Play;
