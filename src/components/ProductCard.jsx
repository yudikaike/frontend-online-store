import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Redirect from './Redirect';

export default class ProductCard extends Component {
  render() {
    const { product, add } = this.props;
    return (
      <div data-testid="product">
        <p>{ product.title }</p>
        { product.shipping.free_shipping
          && <span data-testid="free-shipping">Frete Grátis</span> }
        <img src={ product.thumbnail } alt={ `${product.title}-thumbnail` } />
        <p>{ product.price }</p>
        <Redirect
          id="product-detail-link"
          path={ `/product/${product.id}` }
          text="Detalhes"
        />
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => add(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
  add: PropTypes.func.isRequired,
};
