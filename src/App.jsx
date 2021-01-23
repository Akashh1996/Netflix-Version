import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import SeachResult from './Components/SeachResult/SearchResult';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/search/" exact component={SeachResult} />
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" exact component={Detail} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
