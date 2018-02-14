import React from 'react';
import { Link } from 'react-router-dom';

class TeachingLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Teaching Landing</p>
        <Link to='/teaching/algos'>Algorithms</Link>
      </div>

    );
  }
}

export default TeachingLanding;
