import React from 'react';
import { Route, Link } from 'react-router-dom';

class TreeTraversals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValues: ''
    }

    this.updateTreeValues = this.updateTreeValues.bind(this);
  }

  updateTreeValues(event) {
    this.setState({ treeValues: event.target.value })
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
            placeholder='1,3,5...'
            />
        </label>

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
