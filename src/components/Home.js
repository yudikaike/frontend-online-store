import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Products from './Products';

class Home extends Component {
  render() {
    const {
      searchQuery,
      products,
      categorySelected,
      handleSearchByQuery,
      OnClickSearch,
      addCartProducts,
    } = this.props;
    return (
      <div>
        <Link to="/Carrinho" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
        <div>
          <input
            onChange={ handleSearchByQuery }
            data-testid="query-input"
            type="text"
          />
          <button
            onClick={ OnClickSearch }
            data-testid="query-button"
            type="button"
          >
            Pesquisar
          </button>
          <Products
            searchQuery={ searchQuery }
            products={ products }
            categorySelected={ categorySelected }
            addCartProducts={ addCartProducts }
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.object,
  ),
  categorySelected: PropTypes.bool.isRequired,
  handleSearchByQuery: PropTypes.func.isRequired,
  OnClickSearch: PropTypes.func.isRequired,
  addCartProducts: PropTypes.func.isRequired,
};

Home.defaultProps = {
  products: [],
};

export default Home;
