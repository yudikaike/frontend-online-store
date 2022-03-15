import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      reviews: [],
      email: '',
      rating: '',
      message: '',
    };
    this.renderReviews = this.renderReviews.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.saveReview = this.saveReview.bind(this);
  }

  componentDidMount() {
    this.handleRequest();
    const reviews = localStorage.getItem('reviews');
    if (reviews) {
      this.setState({
        reviews: JSON.parse(reviews),
      });
    }
  }

  componentDidUpdate() {
    const { reviews } = this.state;
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  async handleRequest() {
    const { id } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  saveReview({ target }) {
    const { email, rating, message } = this.state;
    const { value } = target;
    this.setState((prevState) => ({
      reviews: [...prevState.reviews, {
        email,
        rating,
        message,
        id: value,
      }],
      email: '',
      message: '',
    }), () => {
      const { reviews } = this.state;
      localStorage.setItem('reviews', JSON.stringify(reviews));
    });
  }

  renderReviews() {
    const { product, reviews } = this.state;
    if (reviews && reviews.length > 0) {
      const productReviews = reviews.filter(({ id }) => id === product.id);
      return productReviews.map(({ email, message, rating }, index) => (
        <div key={ index }>
          <p>{ email }</p>
          <p>{ rating }</p>
          <p>{ message }</p>
        </div>
      ));
    }
  }

  render() {
    const { addCartProducts } = this.props;
    const { product, email, message } = this.state;
    const { thumbnail, title, price, id } = product;
    return (
      <div>
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho</Link>
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
              <input
                type="radio"
                data-testid="1-rating"
                name="rating"
                value="1"
                onClick={ this.onInputChange }
              />
            </label>
            <label htmlFor="rating">
              2
              <input
                type="radio"
                data-testid="2-rating"
                name="rating"
                value="2"
                onClick={ this.onInputChange }
              />
            </label>
            <label htmlFor="rating">
              3
              <input
                type="radio"
                data-testid="3-rating"
                name="rating"
                value="3"
                onClick={ this.onInputChange }
              />
            </label>
            <label htmlFor="rating">
              4
              <input
                type="radio"
                data-testid="4-rating"
                name="rating"
                value="4"
                onClick={ this.onInputChange }
              />
            </label>
            <label htmlFor="rating">
              5
              <input
                type="radio"
                data-testid="5-rating"
                name="rating"
                value="5"
                onClick={ this.onInputChange }
              />
            </label>
            <textarea
              data-testid="product-detail-evaluation"
              name="message"
              onChange={ this.onInputChange }
              value={ message }
            />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.saveReview }
              value={ id }
            >
              Avaliar
            </button>
          </form>
        </div>
        <div>
          { this.renderReviews() }
        </div>
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  id: PropTypes.string.isRequired,
  addCartProducts: PropTypes.func.isRequired,
};

export default ProductsDetails;
