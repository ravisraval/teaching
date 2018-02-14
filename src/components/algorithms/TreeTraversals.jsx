import React from 'react';
import { Link } from 'react-router-dom';
import TreeNode from './TreeNode';
import { Graph } from 'react-d3-graph';

class TreeTraversals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValues: '5, 3, 7, 2, 4, 6, 8',
      treeRoot: null,
      nodes: [new TreeNode(5)], // just a placeholder so no errors thrown while loading
      highlightedNode: 0,
      traverseSpeed: 1000,
    }

    this.updateTreeValues = this.updateTreeValues.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.levelOrder = this.levelOrder.bind(this);
  }

  componentDidMount() {
    this.updateTree();
  }

  updateTree() {
    try {
      let nums = this.state.treeValues.replace(/[^0-9,.]/g,'').split(',');
      nums = nums.map(num => parseFloat(num));
      nums.unshift(null);

      const nodes = [null]; // spacer so parent-child logic below works
      let currNode;
      let parentNode;
      for (var i = 1; i < nums.length; i++) {
        if (isNaN(nums[i])) continue;

        currNode = new TreeNode(nums[i]);
        if (i % 2 === 0) { // if even
          nodes[i / 2].left = currNode;
          // currNode.parent = nodes[i / 2]; // prob don't need to note parent
        } else if (i !== 1 && i % 2 === 1) { // if odd and not 1
          nodes[(i - 1)/ 2].right = currNode;
          // currNode.parent = nodes[i / 2];
        }
        nodes.push(currNode);
      }

      this.setState({ treeRoot: nodes[1], nodes: nodes.slice(1) });
    }
    catch(err) { // handle weird input
      console.log(err);
    }
  }

  updateTreeValues(event) {
    this.setState({ treeValues: event.target.value },
    this.updateTree);
  }

  inOrder() {}

  preOrder() {}

  postOrder() {}

  levelOrder() {
    this.setState({ highlightedNode: 2}); // temporary to test graph rendering
  }

  render() {
    const graphConfig = {
      height: 300,
      width: 500,
      minZoom: .5,
      maxZoom: 3,
      // staticGraph: true,
      nodeHighlightBehavior: true,
      node: {
        labelProperty: 'value',
      }
    };

    const graphNodes = [];
    const graphLinks = [];

    for (var i = 0; i < this.state.nodes.length; i++) {
      let node = this.state.nodes[i];

      if (node.x == null) { //set first node
        node.x = 250;
        node.y = 250;
      }

      graphNodes.push({
        id: node.value,
        x: node.x,
        y: node.y,
        color: ( i === this.state.highlightedNode ? 'green' : 'orange')
      });

      // will need to modify numbers to avoid overlapping with nested nodes
      if (node.left) {
        node.left.x = node.x - 50;
        node.left.y = node.y + 50;
        graphLinks.push({source: node.value, target: node.left.value});
      }
      if (node.right) {
        node.right.x = node.x + 50;
        node.right.y = node.y + 50;
        graphLinks.push({source: node.value, target: node.right.value});
      }
    };

    const graphProps = {
      id: 'graph',
      data: {
        nodes: graphNodes,
        links: graphLinks
      },
      config: graphConfig
    };

    return (
      <div>
        <Link to='/teaching/algos/'>Back to Algos</Link>
        <br/>
        <Link to='/teaching'>Back to Teaching</Link>
        <h2>Binary Tree Traversal</h2>

        <div className="graph_container">
          <Graph ref='graph' {...graphProps} />
        </div>

        <label>Input Tree Values in Level Order
          <input
            onChange={this.updateTreeValues}
            value={this.state.treeValues}
            />
        </label>

        <div className="radio_wrapper" onChange={this.updateTraversal}>
          <button value='0' onClick={this.inOrder}>In Order</button>
          <button value='1' onClick={this.preOrder}>Pre Order</button>
          <button value='2' onClick={this.postOrder}>Post Order</button>
          <button value='3' onClick={this.levelOrder}>Level Order (AKA Breadth First Search)</button>
        </div>

      </div>

    );
  }
}

export default TreeTraversals;
