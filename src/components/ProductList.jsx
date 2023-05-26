import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Heading from './Heading';

export default class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (products.length ? products
      .map((product, index) => (<ProductCard key={ index } product={ product } />))
      : <Heading text="Nenhum produto foi encontrado" />);
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
