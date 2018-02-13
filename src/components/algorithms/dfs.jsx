import React from 'react';
import { Route, Link } from 'react-router-dom';

class DFS extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>DFS</p>
        <Link to='/teaching/algos/'>Back to Algos</Link>
        <Link to='/teaching'>Back to Teaching</Link>
      </div>

    );
  }
}

export default DFS;
