import React, { Component } from 'react';
import Redirect from './Redirect';

export default class Header extends Component {
  render() {
    return (
      <header>
        <input type="text" placeholder="🔍" />
        <Redirect id="shopping-cart-button" path="/cart" text="🛒" />
      </header>
    );
  }
}
