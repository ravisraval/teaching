import React from 'react';
import { Link } from 'react-router-dom';
import SortCard from './SortCard';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsortedValues: '',
      sortedValues: [2,5,7],
    }

    this.bubbleSort = this.bubbleSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
  }

  bubbleSort() {
    this.setState({ sortedValues: [2,7,5]});
  }
  quickSort() {
    this.setState({ sortedValues: [2,5,7]});
  }
  mergeSort() {}

  render() {
    const sortCards = this.state.sortedValues.map(value => (
      <SortCard
        key={ value }
        value={ value }
      />
      )
    );
    return (
      <div>
        <h2>Sorting</h2>
        <Link to='/teaching'>Back to Teaching</Link>
        <Link to='/teaching/algos/'>Back to Algos</Link>

        <div className="sortCards-container">{sortCards}</div>

        <label>Numbers to Sort
          <input
            onChange={this.updateUnsortedValue}
            value={this.state.unsortedValues}
            />
        </label>

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
