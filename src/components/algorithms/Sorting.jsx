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
      steps: [],
      stepIndex: 0,
      highlightedCards: [],
      swapHappening: false,
    }

    this.bubbleSort = this.bubbleSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.updateUnsortedValue = this.updateUnsortedValue.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  bubbleSort() {
    let steps = [];

    let currentStep = this.state.unsortedValues
      .replace(/[^0-9,.]/g,'').split(',').map(ch => parseFloat(ch));

    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < currentStep.length - 1; i++) {
        steps.push([
          currentStep.map(ch => ch),
          currentStep[i],
          currentStep[i + 1],
          false
        ]);

        if (currentStep[i] > currentStep[i + 1]) {
          let swap = currentStep[i];
          currentStep[i] = currentStep[i + 1];
          currentStep[i + 1] = swap;
          swapped = true;
          steps.push([
            currentStep.map(ch => ch),
            currentStep[i],
            currentStep[i + 1],
            true
          ]);
        }

      }
    } while (swapped);

    this.setState({ steps, stepIndex: 0,
     },
      this.setState({ sortedValues: steps[this.state.stepIndex][0] })
    );
  }

  quickSort() {
    this.quickSteps();
    this.setState({ sortedValues: [2,5,9,7]});
  }

  quickSteps() {
    const steps = [];
  }

  mergeSort() {
    this.mergeSteps();
  }

  mergeSteps() {
    const steps = [];
  }

  prevStep() {

  }

  nextStep() {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
      sortedValues: this.state.steps[this.state.stepIndex][0],
      highlightedCards: this.state.steps[this.state.stepIndex].slice(1,3),
      swapHappening: this.state.steps[this.state.stepIndex].slice(-1)[0]
    });

  }

  updateUnsortedValue(event) {
    this.setState({
      unsortedValues: event.target.value,
      sortedValues: event.target.value.replace(/[^0-9,.]/g,'').split(',')
     });
  }

  render() {
    const sortCards = this.state.sortedValues.map(value => (
      <SortCard
        key={ value } value={ value }
        highCards={this.state.highlightedCards}
        swapping={this.state.swapHappening}
     />
    ));

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

        <div className="btn-group">
          <button onClick={this.prevStep}>Previous Step</button>
          <button onClick={this.nextStep}>Next Step</button>
        </div>

        <label>Numbers to Sort
          <input
            onChange={this.updateUnsortedValue}
            value={this.state.unsortedValues}
            />
        </label>

        <div className="radio_wrapper side-submenu">
          <button onClick={this.bubbleSort}>Bubble Sort</button>
          <button onClick={this.quickSort}>Quick Sort</button>
          <button onClick={this.mergeSort}>Merge Sort</button>
        </div>

      </div>

    );
  }
}

export default Sorting;
