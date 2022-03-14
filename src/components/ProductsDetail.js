import React from 'react';
import PropTypes from 'prop-types';

class ProductsDetails extends React.Component {
  render() {
    const { params, products } = this.props;
    const product = products.find(({ id }) => id === params.id);
    const { thumbnail, title, price } = product;
    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } />
          <p data-testid="product-detail-name">{ title }</p>
          <p>{ price }</p>
          <button type="submit">Adicionar ao carrinho</button>
        </div>
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  params: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default ProductsDetails;
