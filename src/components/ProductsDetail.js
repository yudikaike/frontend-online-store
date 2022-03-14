import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsDetails extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.saveState = this.saveState.bind(this);
    this.state = {
      email: '',
      rating: '',
      mensagem: '',
      dados: [],
    };
  }

  componentDidMount() {
    const prevDados = localStorage.getItem('dados');
    this.setState({
      dados: JSON.parse(prevDados),
    });
    console.log(prevDados);
  }

  onInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  saveState = () => {
    const {
      email,
      rating,
      mensagem,
    } = this.state;

    this.setState((prevState) => ({
      dados: [...prevState.dados, {
        email,
        rating,
        mensagem,
      }],
      email: '',
      mensagem: '',
    }), () => {
      const { dados } = this.state;
      localStorage.setItem('dados', JSON.stringify(dados));
    });
  }

  render() {
    const { email, mensagem, dados } = this.state;
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
        <div>
          <h1>Avaliações</h1>
          <form>
            <label htmlFor="product-detail-email">
              <input
                type="email"
                data-testid="product-detail-email"
                onChange={ this.onInputChange }
                name="email"
                value={ email }
              />
            </label>
            <label htmlFor="rating">
              1
              <input type="radio" data-testid="1-rating" name="rating" value="1" onClick={ this.onInputChange } />
            </label>
            <label htmlFor="rating">
              2
              <input type="radio" data-testid="2-rating" name="rating" value="2" onClick={ this.onInputChange } />
            </label>
            <label htmlFor="rating">
              3
              <input type="radio" data-testid="3-rating" name="rating" value="3" onClick={ this.onInputChange } />
            </label>
            <label htmlFor="rating">
              4
              <input type="radio" data-testid="4-rating" name="rating" value="4" onClick={ this.onInputChange } />
            </label>
            <label htmlFor="rating">
              5
              <input type="radio" data-testid="5-rating" name="rating" value="5" onClick={ this.onInputChange } />
            </label>
            <textarea data-testid="product-detail-evaluation" name="mensagem" onChange={ this.onInputChange } value={ mensagem } />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.saveState }
            >
              Avaliar
            </button>
          </form>
        </div>
        <div>
          {dados.map((avaliacao, index) => (
            <div key={ index }>
              {avaliacao.email}
              {avaliacao.rating}
              {avaliacao.mensagem}
            </div>))}
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
