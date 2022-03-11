import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends Component {
  render() {
    const { products } = this.props;
    return (
      products.map(({ thumbnail, title, price, id }, index) => (
        <div key={ index } data-testid="product" className="Product">
          <img src={ thumbnail } alt={ title } />
          <p>{ title }</p>
          <p>{ price }</p>
          <Link to={ `/Products/${id}` }> Detalhes </Link>
        </div>
      ))
    );
  }
}

Product.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Product.defaultProps = {
  products: [],
};

export default Product;
