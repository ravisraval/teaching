import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


const Root = ({ match }) => (
  <BrowserRouter>
    <App match={match}/>
  </BrowserRouter>
);

export default Root;
