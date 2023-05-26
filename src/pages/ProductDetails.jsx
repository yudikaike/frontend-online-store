import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '../components';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { product: {}, isDone: false };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product, isDone: true });
  }

  render() {
    const { product: { attributes, title, price, thumbnail }, isDone } = this.state;
    return (
      isDone && (
        <main>
          <Heading id="product-detail-name" text={ `${title} - R$ ${price}` } />
          <img src={ thumbnail } alt={ title } />
          { attributes.map(({ name, value_name: value }, index) => (
            <div key={ index }>{`${name}: ${value}`}</div>)) }
        </main>
      ));
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
