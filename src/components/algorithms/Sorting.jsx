import React from 'react';
import { Link } from 'react-router-dom';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Sorting</h2>
        <Link to='/teaching'>Back to Teaching</Link>
        <Link to='/teaching/algos/'>Back to Algos</Link>

      </div>

    );
  }
}

export default Sorting;
