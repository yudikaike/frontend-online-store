import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Main, Cart, ProductDetails } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Main } />
        <Route path="/cart" component={ Cart } />
        <Route path="/product/:id" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
