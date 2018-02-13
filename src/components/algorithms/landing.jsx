import React from 'react';
import { Link } from 'react-router-dom';

class AlgoLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Algorithms landing</p>
        <Link to='/teaching/algos/tree_traversals'>Tree Traversals</Link>
        <Link to='/teaching'>Back to Teaching</Link>
      </div>

    );
  }
}

export default AlgoLanding;
