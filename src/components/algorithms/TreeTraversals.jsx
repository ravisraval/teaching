import React from 'react';
import { Link } from 'react-router-dom';
import TreeNode from './TreeNode';
import { Graph } from 'react-d3-graph';

class TreeTraversals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValues: '55,20,75,10,30,60,90,1,15,25,40,57,67,88,101,0,2,12,17,21,27,35,45,56,69,62,70,85,89,100,105',
      treeRoot: null,
      nodes: [new TreeNode(5)], // just a placeholder so no errors thrown while loading
      traversal: '',
      stepIndex: 0,
      steps: [],
    }

    this.updateTreeValues = this.updateTreeValues.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.levelOrder = this.levelOrder.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.preOrder = this.preOrder.bind(this);
    this.inOrder = this.inOrder.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
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

  inOrder() {
    const nodeValues = [];
    this.state.nodes.forEach( node => {
      nodeValues.push(node.value);
    });

    const steps = [];
    const nodeOrder = [];

    function inOrderRec(node) {
      if (node.left) {
        inOrderRec(node.left);
      }
      nodeOrder.push(node.value);
      if (node.right) {
        inOrderRec(node.right);
      }
    }

    inOrderRec(this.state.treeRoot);

    for (var i = 0; i < nodeOrder.length; i++) {
      steps.push(nodeValues.indexOf(nodeOrder[i]));
    }

    this.setState({ traversal: 'In Order', stepIndex: 0, steps });
  }

  preOrder() {
    const nodeValues = [];
    this.state.nodes.forEach( node => {
      nodeValues.push(node.value);
    });

    const steps = [];
    const nodeOrder = [];

    function preOrderRec(node) {
      nodeOrder.push(node.value);
      if (node.left) {
        preOrderRec(node.left);
      }
      if (node.right) {
        preOrderRec(node.right);
      }
    }

    preOrderRec(this.state.treeRoot);

    for (var i = 0; i < nodeOrder.length; i++) {
      steps.push(nodeValues.indexOf(nodeOrder[i]));
    }

    this.setState({ traversal: 'Pre Order', stepIndex: 0, steps });
  }

  postOrder() {
    const nodeValues = [];
    this.state.nodes.forEach( node => {
      nodeValues.push(node.value);
    });

    const steps = [];
    const nodeOrder = [];

    function postOrderRec(node) {
      if (node.left) {
        postOrderRec(node.left);
      }
      if (node.right) {
        postOrderRec(node.right);
      }
      nodeOrder.push(node.value);
    }

    postOrderRec(this.state.treeRoot);

    for (var i = 0; i < nodeOrder.length; i++) {
      steps.push(nodeValues.indexOf(nodeOrder[i]));
    }

    this.setState({ traversal: 'Post Order', stepIndex: 0, steps });

  }

  levelOrder() {
    const steps = [];
    for (var i = 0; i < this.state.nodes.length; i++) {
      steps.push(i);
    }

    this.setState({ traversal: 'Level Order', stepIndex: 0, steps });
  }

  nextStep() {
    if (this.state.stepIndex === this.state.steps.length - 1) return;
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  }

  prevStep() {
    if (this.state.stepIndex === 0) return;
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  render() {
    const {steps, stepIndex} = this.state;

    const graphConfig = {
      height: 400,
      width: 1200,
      // TODO: use window width and height? then use this relative to node placement?
      minZoom: .5,
      maxZoom: 3,
      staticGraph: true,
      nodeHighlightBehavior: true,
      node: {
        labelProperty: 'value',
      }
    };

    const graphNodes = [];
    const graphLinks = [];
    let x_move = 180;
    for (var i = 0; i < this.state.nodes.length; i++) {
      let node = this.state.nodes[i];

      if (node.x == null) { //set first node
        node.x = 500;
        node.y = 10;
      }

      graphNodes.push({
        id: node.value,
        x: node.x,
        y: node.y,
        color: ( i === steps[stepIndex] ? 'green' : 'orange')
      });

      if (node.left) {
        node.left.x = node.x - x_move;
        node.left.y = node.y + 50;
        graphLinks.push({source: node.value, target: node.left.value});
      }
      if (node.right) {
        node.right.x = node.x + x_move;
        node.right.y = node.y + 50;
        graphLinks.push({source: node.value, target: node.right.value});
      }

      if ([0,2,6,14].includes(i)) x_move /= 2;
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

        <h3>Traversal Method: {this.state.traversal}</h3>

        <div className="radio_wrapper">
          <button onClick={this.inOrder}>In Order</button>
          <button onClick={this.preOrder}>Pre Order</button>
          <button onClick={this.postOrder}>Post Order</button>
          <button onClick={this.levelOrder}>Level Order (AKA Breadth First Search)</button>
        </div>

        <div className="graph_container">
          <Graph ref='graph' {...graphProps} />
        </div>

        <label>Input Tree Values in Level Order
          <input
            onChange={this.updateTreeValues}
            value={this.state.treeValues}
            />
        </label>

        <div className="btn-group">
          <button onClick={this.prevStep}>Previous Step</button>
          <button onClick={this.nextStep}>Next Step</button>
        </div>


      </div>

    );
  }
}

export default TreeTraversals;
