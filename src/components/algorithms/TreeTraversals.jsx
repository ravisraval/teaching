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
    }

    this.updateTreeValues = this.updateTreeValues.bind(this);
    this.updateTraversal = this.updateTraversal.bind(this);
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

  updateTraversal(event) {
    this.setState({ traversalMethod: parseInt(event.target.value) });
  }

  render() {
    const graphConfig = {
      height: 200,
      width: 500,
      node: {
        labelProperty: 'value',
      }
    };

    const graphNodes = [];
    const graphLinks = [];

    this.state.nodes.forEach(node => {
      graphNodes.push({id: node.value});

      if (node.left) {
        graphLinks.push({source: node.value, target: node.left.value});
      }
      if (node.right) {
        graphLinks.push({source: node.value, target: node.right.value});
      }

    });

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
        <p>Binary Tree Traversal</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <Graph {...graphProps}/>

        <label>Input Tree Values in Level Order
          <input
            onChange={this.updateTreeValues}
            value={this.state.treeValues}
            placeholder='[[5],[3,7],[2,4,6,8]]'
            />
        </label>

        <div className="radio_wrapper" onChange={this.updateTraversal}>
          <input type='radio' value='0' checked={this.state.traversalMethod === 0 }/> In Order
          <input type='radio' value='1' checked={this.state.traversalMethod === 1 }/> Pre Order
          <input type='radio' value='2' checked={this.state.traversalMethod === 2 }/> Post Order
          <input type='radio' value='3' checked={this.state.traversalMethod === 3 }/> Level Order (AKA Breadth First Search, or bfs)
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <Link to='/teaching/algos/'>Back to Algos</Link>
        <br/>
        <Link to='/teaching'>Back to Teaching</Link>
      </div>

    );
  }
}

export default TreeTraversals;
