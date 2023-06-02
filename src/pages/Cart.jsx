import React, { Component } from 'react';
import { Heading, Redirect } from '../components';

class Main extends Component {
  constructor() {
    super();
    this.state = { cart: [] };
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  }

  componentWillUnmount() {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  add({ target: { value } }) {
    const { cart } = this.state;
    const index = cart.findIndex(({ id }) => value === id);
    cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
    this.setState({ cart });
  }

  subtract(event) {
    const { cart } = this.state;
    const index = cart.findIndex(({ id }) => event.target.value === id);
    if (cart[index].quantity > 1) {
      cart[index] = { ...cart[index], quantity: cart[index].quantity - 1 };
    } else return this.remove(event);
    this.setState({ cart });
  }

  remove({ target: { value } }) {
    const { cart } = this.state;
    this.setState({ cart: cart.filter(({ id }) => value !== id) });
  }

  render() {
    const { cart } = this.state;
    return (
      <main>
        <Redirect path="/" text="↩️" />
        { cart.length ? cart.map(({ id, title, quantity }, index) => (
          <div key={ index }>
            <div data-testid="shopping-cart-product-name">{ title }</div>
            <div data-testid="shopping-cart-product-quantity">{ quantity }</div>
            <button
              data-testid="product-increase-quantity"
              type="button"
              value={ id }
              onClick={ this.add }
            >
              +
            </button>
            <button
              data-testid="product-decrease-quantity"
              type="button"
              value={ id }
              onClick={ this.subtract }
            >
              -
            </button>
            <button type="button" value={ id } onClick={ this.remove }>x</button>
          </div>))
          : <Heading id="shopping-cart-empty-message" text="Seu carrinho está vazio" /> }
        <Redirect id="checkout-products" path="/checkout" text="Finalizar compra" />
      </main>
    );
  }
}

export default Main;
