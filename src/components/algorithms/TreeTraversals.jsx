import React from 'react';
import { Route, Link } from 'react-router-dom';

class TreeTraversals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValues: '[ [5], [3, 7], [2, 4, 6, 8] ]',
      treeRoot: null,
      traversalMethod: 0,
    }

    this.updateTreeValues = this.updateTreeValues.bind(this);
    this.updateTraversal = this.updateTraversal.bind(this);
    this.updateTree = this.updateTree.bind(this);
  }

  updateTree() {
    console.log(this.state.treeValues);

  }

  updateTreeValues(event) {
    this.setState({ treeValues: event.target.value },
    this.updateTree);
  }

  updateTraversal(event) {
    this.setState({ traversalMethod: parseInt(event.target.value) });
  }

  render() {
    return (
      <div>
        <p>Tree Traversal</p>
        <br/>
        <br/>
        <br/>
        <br/>

        <label>Input Tree Values in Level Order
          <input
            onChange={this.updateTreeValues}
            value={this.state.treeValues}
            placeholder='[[5],[3,7],[2,4,6,8]]'
            />
        </label>

        <div onChange={this.updateTraversal}>
          <input type='radio' value='0' checked={this.state.traversalMethod === 0 }/> Depths First Search
          <input type='radio' value='1' checked={this.state.traversalMethod === 1 }/> Breadth First Search
          <input type='radio' value='2' checked={this.state.traversalMethod === 2 }/> In Order
          <input type='radio' value='3' checked={this.state.traversalMethod === 3 }/> Pre Order
          <input type='radio' value='4' checked={this.state.traversalMethod === 4 }/> Post Order
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
