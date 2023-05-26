import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { Header, Heading, ProductList } from '../components';

export default class Main extends Component {
  constructor() {
    super();
    this.state = { query: '', products: [], isDone: false };
    this.setQuery = this.setQuery.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  async getProducts() {
    const { query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery('', query);
    this.setState({ products: results, isDone: true });
  }

  setQuery({ target: { value } }) {
    this.setState({ query: value });
  }

  render() {
    const { products, isDone } = this.state;
    return (
      <main>
        <Header setQuery={ this.setQuery } getProducts={ this.getProducts } />
        { isDone ? <ProductList products={ products } /> : <Heading
          id="home-initial-message"
          text="Digite algum termo de pesquisa ou escolha uma categoria."
        /> }
      </main>
    );
  }
}
