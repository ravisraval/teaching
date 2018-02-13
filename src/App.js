import React from 'react';
import { Route, Link } from 'react-router-dom';

import TeachingLanding from './components/TeachingLanding';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Route exact path="/teaching" component={TeachingLanding}/>
      </div>
    );
  }
}

export default App;
