import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Main from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Main } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
