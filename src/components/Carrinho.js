import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
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
  checkQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  quantity: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  filteredResults: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Carrinho;
