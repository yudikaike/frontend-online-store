import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { Header, Heading, ProductList } from '../components';

export default class Main extends Component {
  constructor() {
    super();
    this.state = { query: '', categoryId: '', products: [], isDone: false };
    this.setQuery = this.setQuery.bind(this);
    this.setCategoryId = this.setCategoryId.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  async getProducts() {
    const { categoryId, query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({ products: results, isDone: true });
  }

  setCategoryId({ target: { value } }) {
    this.setState(({ categoryId: value }), () => this.getProducts());
  }

  setQuery({ target: { value } }) {
    this.setState({ query: value });
  }

  render() {
    const { products, isDone } = this.state;
    return (
      <main>
        <Header
          setQuery={ this.setQuery }
          setCategoryId={ this.setCategoryId }
          getProducts={ this.getProducts }
        />
        { isDone ? <ProductList products={ products } /> : <Heading
          id="home-initial-message"
          text="Digite algum termo de pesquisa ou escolha uma categoria."
        /> }
      </main>
    );
  }
}
