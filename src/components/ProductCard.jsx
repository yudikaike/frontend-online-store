import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Redirect from './Redirect';

export default class ProductCard extends Component {
  render() {
    const { product: { id, title, thumbnail, price } } = this.props;
    return (
      <div data-testid="product">
        <p>{ title }</p>
        <img src={ thumbnail } alt={ `${title}-thumbnail` } />
        <p>{ price }</p>
        <Redirect id="product-detail-link" path={ `/product/${id}` } text="Detalhes" />
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
  }).isRequired,
};
