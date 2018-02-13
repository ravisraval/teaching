import React from 'react';
import { Route, Link } from 'react-router-dom';

class AlgoLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Algorithms landing</p>
        <Link to='/teaching/algos/dfs'>Depth First Search</Link>
        <Link to='/teaching'>Back to Teaching</Link>
      </div>

    );
  }
}

export default AlgoLanding;
