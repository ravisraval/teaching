import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import TeachingLanding from './components/TeachingLanding';
import AlgoLanding from './components/algorithms/landing';
import TreeTraversals from './components/algorithms/TreeTraversals';
import Sorting from './components/algorithms/Sorting';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="body_wrapper">
        <Route exact path="/teaching" component={TeachingLanding}/>
        <Route exact path="/teaching/algos" component={AlgoLanding}/>
        <Route exact path="/teaching/algos/tree_traversals" component={TreeTraversals}/>
        <Route exact path="/teaching/algos/sorting" component={Sorting}/>
      </div>
    );
  }
}

export default App;
