import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Carrinho from './components/Carrinho';
import Home from './components/Home';
import Filter from './components/Filter';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Filter />
              <Home />
            </Route>
            <Route exact path="/carrinho"><Carrinho /></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
