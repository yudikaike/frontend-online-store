import React, { Component } from 'react';
import { Heading, Redirect } from '../components';

class Main extends Component {
  constructor() {
    super();
    this.state = { cart: [] };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  }

  render() {
    const { cart } = this.state;
    return (
      <main>
        <Redirect path="/" text="↩️" />
        <Heading id="shopping-cart-empty-message" text="Seu carrinho está vazio" />
        { cart.length ? cart.map(({ title, quantity }, index) => (
          <div key={ index }>
            <div data-testid="shopping-cart-product-name">{ title }</div>
            <div data-testid="shopping-cart-product-quantity">{ quantity }</div>
          </div>))
          : <Heading id="shopping-cart-empty-message" text="Seu carrinho está vazio" /> }
      </main>
    );
  }
}

export default Main;
