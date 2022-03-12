import React from 'react';

class ProductsDetails extends React.Component {
  constructor() {
    super();
    this.setState({
    });
  }

  render() {
    const { match , products } = this.props;
    const prod = products.find(produto => produto.id === match.params.id);
    return (
      <div>
        <div>
          <img src={ prod.thumbnail } alt={ prod.title } />
          <p data-testid="product-detail-name">{ prod.title }</p>
          <p>{ prod.price }</p>
          <button type="submit">adicionar carrinho</button>
        </div>
      </div>
    );
  }
}
export default ProductsDetails;
