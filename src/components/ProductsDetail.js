import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsDetails extends React.Component {
  render() {
    const { params, products, addCartProducts } = this.props;
    const product = products.find(({ id }) => id === params.id);
    const { thumbnail, title, price, id } = product;
    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } />
          <p data-testid="product-detail-name">{ title }</p>
          <p>{ price }</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="submit"
            onClick={ addCartProducts }
            value={ id }
          >
            Adicionar ao carrinho
          </button>
          <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho</Link>
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
  addCartProducts: PropTypes.func.isRequired,
};

export default ProductsDetails;
