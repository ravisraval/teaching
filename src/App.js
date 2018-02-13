import React from 'react';
import { Route, Link } from 'react-router-dom';

import TeachingLanding from './components/TeachingLanding';
import AlgoLanding from './components/algorithms/landing';
import DFS from './components/algorithms/dfs';

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
      <div>
        <Route exact path="/teaching" component={TeachingLanding}/>
        <Route exact path="/teaching/algos" component={AlgoLanding}/>
        <Route exact path="/teaching/algos/dfs" component={DFS}/>
      </div>
    );
  }
}

export default App;
