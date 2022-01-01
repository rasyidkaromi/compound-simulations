/* eslint-disable */
/* eslint-disable-next-line */


import React from 'react';
import { Route } from "react-router-dom";

import './App.css';
import Header from './component/header'
import Rate from './component/rate'
import Supply from './component/supply'
import Borrow from './component/borrow'


const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact path={"/"} component={Rate} />
      <Route path={"/supply"} component={Supply} />
      <Route path={"/borrow"} component={Borrow} />
    </div>
  );
}

export default App;
