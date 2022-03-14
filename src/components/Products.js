import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

class Products extends Component {
  renderProducts() {
    const { searchQuery, categorySelected, products, addCartProducts } = this.props;
    if (searchQuery || categorySelected) {
      if (!products.length) {
        return (
          <div>Nenhum produto encontrado.</div>
        );
      }
      return (
        <Product products={ products } addCartProducts={ addCartProducts } />
      );
    }
    return (
      <div data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </div>
    );
  }

  render() {
    return (
      <div className="Products">
        { this.renderProducts() }
      </div>
    );
  }
}

Products.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  categorySelected: PropTypes.bool.isRequired,
  addCartProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Products.defaultProps = {
  products: [],
};

export default Products;
