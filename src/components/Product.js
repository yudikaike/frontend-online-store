import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends Component {
  render() {
    const { products, addCartProducts } = this.props;
    return (
      products.map(({ thumbnail, title, price, id }, index) => (
        <div key={ index } data-testid="product" className="Product">
          <img src={ thumbnail } alt={ title } />
          <p>{ title }</p>
          <p>{ price }</p>
          <Link data-testid="product-detail-link" to={ `/Products/${id}` }>Detalhes</Link>
          <button
            onClick={ addCartProducts }
            type="button"
            value={ id }
            data-testid="product-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))
    );
  }
}

Product.propTypes = {
  addCartProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Product.defaultProps = {
  products: [],
};

export default Product;
