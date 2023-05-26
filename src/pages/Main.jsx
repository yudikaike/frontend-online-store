import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { Header, Heading, ProductList } from '../components';

export default class Main extends Component {
  constructor() {
    super();
    this.state = { query: '', categoryId: '', products: [], cart: [], isDone: false };
    this.setQuery = this.setQuery.bind(this);
    this.setCategoryId = this.setCategoryId.bind(this);
    this.add = this.add.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) this.setState({ cart });
  }

  componentWillUnmount() {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
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

  add(product) {
    const { cart } = this.state;
    if (cart.some(({ id }) => product.id === id)) {
      const index = cart.findIndex(({ id }) => product.id === id);
      cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
      this.setState({ cart });
    } else {
      this.setState({ cart: [...cart, { ...product, quantity: 1 }] });
    }
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
        { isDone ? <ProductList products={ products } add={ this.add } /> : <Heading
          id="home-initial-message"
          text="Digite algum termo de pesquisa ou escolha uma categoria."
        /> }
      </main>
    );
  }
}
