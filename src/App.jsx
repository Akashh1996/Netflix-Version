import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import SeachResult from './Components/SeachResult/SearchResult';
import Home from './Components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/search/" exact component={SeachResult} />
        <Route path="/" exact component={Home} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
