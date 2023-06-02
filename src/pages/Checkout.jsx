import React, { Component } from 'react';
import { CheckoutForm } from '../components';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = { cart: [] };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  }

  getTotal() {
    const { cart } = this.state;
    return cart.reduce((total, { price }) => {
      total += price;
      return total;
    }, 0);
  }

  render() {
    const { cart } = this.state;
    return (
      <main>
        { cart.length && cart.map(({ title, price, quantity }, index) => (
          <div key={ index }>
            <div>{ title }</div>
            <div>{ price }</div>
            <div>{ quantity }</div>
          </div>
        )) }
        { `Total: ${this.getTotal()}`}
        <CheckoutForm />
      </main>
    );
  }
}
