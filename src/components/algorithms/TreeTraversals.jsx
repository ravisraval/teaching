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
      traversalMethod: 0, // or maybe just make these one time buttons
      nodes: [new TreeNode(5)],
      highlightedNode: 0,
    }

    this.updateTreeValues = this.updateTreeValues.bind(this);
    this.traverse = this.traverse.bind(this);
    this.updateTree = this.updateTree.bind(this);
  }

  componentDidMount() {
    this.updateTree();
  }

  updateTree() {
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

  updateTreeValues(event) {
    this.setState({ treeValues: event.target.value },
    this.updateTree);
  }

  traverse(event) {
    switch (event.target.value) {
      case '0':
        this.inOrder();
        break;
      case '1':
        this.preOrder();
        break;
      case '2':
        this.postOrder();
        break;
      case '3':
        this.levelOrder();
        break;
      default:
        console.log('something really messed up');
    }
  }

  inOrder() {
    this.setState({ })
    console.log('inorder');
  }

  preOrder() {
    console.log('preorder');

  }

  postOrder() {
    console.log('postorder');

  }

  levelOrder() {
    console.log('levelorder');

  }

  render() {
    const graphConfig = {
      height: 300,
      width: 500,
      minZoom: .5,
      maxZoom: 3,
      nodeHighlightBehavior: true,
      node: {
        labelProperty: 'value',
        color: 'rgb(233, 201, 29)'
      }
    };

    const graphNodes = [];
    const graphLinks = [];
    for (var i = 0; i < this.state.nodes.length; i++) {
      let node = this.state.nodes[i]
      if (i === this.state.highlightedNode) {
        node.color === 'green';
        console.log(`setting ${node} to green`);
      }
      graphNodes.push({
        id: node.value,
        color: ( i === this.state.highlightedNode ? 'green' : 'orange')
      });

      if (node.left) {
        graphLinks.push({source: node.value, target: node.left.value});
      }
      if (node.right) {
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
          <Graph {...graphProps} />
        </div>

        <label>Input Tree Values in Level Order
          <input
            onChange={this.updateTreeValues}
            value={this.state.treeValues}
            />
        </label>

        <div className="radio_wrapper" onChange={this.updateTraversal}>
          <button value='0' onClick={this.traverse}>In Order</button>
          <button value='1' onClick={this.traverse}>Pre Order</button>
          <button value='2' onClick={this.traverse}>Post Order</button>
          <button value='3' onClick={this.traverse}> Level Order (AKA Breadth First Search, or bfs)</button>
        </div>

      </div>

    );
  }
}

export default TreeTraversals;
