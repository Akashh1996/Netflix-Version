import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Header} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
