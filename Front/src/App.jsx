import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import SeachResult from './Components/SeachResult/SearchResult';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import MyList from './Components/MyList/MyList';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/detail/:id" exact component={Detail} />
        <>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/search/" exact component={SeachResult} />
          <Route path="/myList/" exact component={MyList} />
        </>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
