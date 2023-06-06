import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Redirect from './Redirect';
import Menu from './Menu';

export default class Header extends Component {
  render() {
    const { setQuery, setCategoryId, getProducts, quantity } = this.props;
    return (
      <header>
        <input
          data-testid="query-input"
          type="text"
          placeholder="🔍"
          onChange={ setQuery }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ getProducts }
        >
          Buscar
        </button>
        <Redirect id="shopping-cart-button" path="/cart" text="🛒" />
        <span data-testid="shopping-cart-size">{ quantity }</span>
        <Menu setCategoryId={ setCategoryId } />
      </header>
    );
  }
}

Header.propTypes = {
  setQuery: PropTypes.func.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};
