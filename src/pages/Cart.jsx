import React, { Component } from 'react';
import { Heading, Redirect } from '../components';

class Main extends Component {
  render() {
    return (
      <main>
        <Redirect path="/" text="↩️" />
        <Heading id="shopping-cart-empty-message" text="Seu carrinho está vazio" />
      </main>
    );
  }
}

export default Main;
