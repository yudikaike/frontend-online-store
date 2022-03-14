import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.renderCartItems = this.renderCartItems.bind(this);
  }

  renderCartItems() {
    const { products, cartProducts } = this.props;
    const results = cartProducts
      .map((cartId) => products.find(({ id }) => cartId === id));
    const filteredResults = results
      .filter((result, index) => result !== results[index + 1]);
    const quantity = filteredResults
      .map(({ id }) => cartProducts
        .filter((cartProductId) => cartProductId === id).length);
    return filteredResults.map((result, index) => (
      <div key={ index }>
        <p data-testid="shopping-cart-product-name">{ result.title }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity[index] }</p>
      </div>
    ));
  }

  render() {
    const { cartProducts } = this.props;
    return (
      <div>
        { cartProducts.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : this.renderCartItems() }
      </div>
    );
  }
}

Carrinho.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  cartProducts: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Carrinho;
