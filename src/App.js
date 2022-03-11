import React, { Component } from 'react';
import Filter from './components/Filter';

class App extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Filter />
      </div>
    );
  }
}

export default App;
