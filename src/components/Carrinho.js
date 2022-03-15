import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.renderCartItems = this.renderCartItems.bind(this);
  }

  componentDidMount() {
    const { checkQuantity } = this.props;
    checkQuantity();
  }

  renderCartItems() {
    const { filteredResults, quantity, addItem, removeItem } = this.props;
    return filteredResults.map((result, index) => (
      <div key={ index }>
        <p data-testid="shopping-cart-product-name">{ result.title }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity[index] }</p>
        <button
          data-testid="product-increase-quantity"
          onClick={ addItem }
          value={ index }
          type="button"
        >
          +
        </button>
        <button
          data-testid="product-decrease-quantity"
          onClick={ removeItem }
          value={ index }
          type="button"
        >
          -
        </button>
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
  cartProducts: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  checkQuantity: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  removeItem: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  addItem: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  quantity: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  filteredResults: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Carrinho;
