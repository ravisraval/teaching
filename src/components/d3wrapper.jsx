import React from 'react';
import D3Play from './d3play';
import { Link } from 'react-router-dom';

class d3Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Link to='/teaching'>Back to Teaching</Link>
        <h2>D3 Playground</h2>

        <D3Play />
      </div>

    );
  }
}

export default d3Wrapper;
