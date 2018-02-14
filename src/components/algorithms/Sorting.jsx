import React from 'react';
import { Link } from 'react-router-dom';

class Sorting extends React.Component {
  constructor(props) {
    super(props);

    this.bubbleSort = this.bubbleSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
  }

  bubbleSort() {}
  quickSort() {}
  mergeSort() {}

  render() {
    return (
      <div>
        <h2>Sorting</h2>
        <Link to='/teaching'>Back to Teaching</Link>
        <Link to='/teaching/algos/'>Back to Algos</Link>

        <div className="radio_wrapper">
          <button onClick={this.bubbleSort}>Bubble Sort</button>
          <button onClick={this.quickSort}>Quick Sort</button>
          <button onClick={this.mergeSort}>Merge Sort</button>
        </div>

      </div>

    );
  }
}

export default Sorting;
