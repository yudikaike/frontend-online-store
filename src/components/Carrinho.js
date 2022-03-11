import React from 'react';

class Carrinho extends React.Component {
  render() {
    const { products, cartProducts, quantity } = this.props;
    const results = cartProducts
      .map((cartId) => products.find(({ id }) => cartId === id));

    return (
      <div>
        { cartProducts === []
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : results.map((result, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{ result.title }</p>
              <p data-testid="shopping-cart-product-quantity">{ result.sold_quantity }</p>
            </div>
          )) }
      </div>
    );
  }
}

export default Carrinho;
