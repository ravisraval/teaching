import React from 'react';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import SortCard from './SortCard';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsortedValues: '',
      sortedValues: [2,5,7,9],
    }

    this.bubbleSort = this.bubbleSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.updateUnsortedValue = this.updateUnsortedValue.bind(this);
  }

  bubbleSort() {
    this.setState({ sortedValues: [9,2,7,5]});
  }
  quickSort() {
    this.setState({ sortedValues: [2,5,9,7]});
  }
  mergeSort() {}

  updateUnsortedValue(event) {
    this.setState({
      unsortedValues: event.target.value,
      sortedValues: event.target.value.replace(/[^0-9,.]/g,'').split(',')
     });
  }

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

        <FlipMove
          enterAnimation='accordionHorizontal'
          maintainContainerHeight
          duration={350}
          staggerDurationBy={250}
          className="sortCards-container"
          >
            {sortCards}
        </FlipMove>

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
