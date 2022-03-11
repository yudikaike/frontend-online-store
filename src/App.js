import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from './services/api';
import Products from './components/Products';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchQuery: '',
      products: [],
    };
    this.handleSearchByQuery = this.handleSearchByQuery.bind(this);
    this.OnClickSearch = this.OnClickSearch.bind(this);
  }

  handleSearchByQuery({ target }) {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  }

  async OnClickSearch() {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      const request = await getProductsFromCategoryAndQuery('', inputValue);
      const products = await request.results;
      this.setState({
        products,
        searchQuery: request.query,
      });
    } else {
      this.setState({
        searchQuery: '',
      });
    }
  }

  render() {
    const { searchQuery, products } = this.state;
    return (
      <div>
        <input
          onChange={ this.handleSearchByQuery }
          data-testid="query-input"
          type="text"
        />
        <button
          onClick={ this.OnClickSearch }
          data-testid="query-button"
          type="button"
        >
          Pesquisar
        </button>
        <Products
          searchQuery={ searchQuery }
          products={ products }
          renderProducts={ this.renderProducts }
        />
      </div>
    );
  }
}

export default App;
