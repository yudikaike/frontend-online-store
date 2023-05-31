import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading, Redirect, ReviewForm, Reviews } from '../components';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { product: {}, reviews: {}, cart: [], isDone: false };
    this.submit = this.submit.bind(this);
  }

  async componentDidMount() {
    this.getCart();
    this.getReviews();
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product, isDone: true });
  }

  componentWillUnmount() {
    const { cart, reviews } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  getReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    if (reviews) this.setState({ reviews });
  }

  getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) this.setState({ cart });
  }

  submit(review) {
    const { product: { id }, reviews } = this.state;
    if (!reviews[id]) reviews[id] = [review];
    else reviews[id].push(review);
    this.setState({ reviews });
  }

  add(product) {
    const { cart } = this.state;
    if (cart.some(({ id }) => product.id === id)) {
      const index = cart.findIndex(({ id }) => product.id === id);
      cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
      this.setState({ cart });
    } else {
      this.setState({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  }

  render() {
    const { product, reviews, isDone } = this.state;
    return (
      isDone && (
        <main>
          <Redirect id="shopping-cart-button" path="/cart" text="🛒" />
          <Redirect path="/" text="↩️" />
          <Heading
            id="product-detail-name"
            text={ `${product.title} - R$ ${product.price}` }
          />
          <img src={ product.thumbnail } alt={ product.title } />
          { product.attributes.map(({ name, value_name: value }, index) => (
            <div key={ index }>{`${name}: ${value}`}</div>)) }
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => this.add(product) }
          >
            Adicionar ao Carrinho
          </button>
          <ReviewForm submit={ this.submit } />
          <Reviews id={ product.id } reviews={ reviews } />
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
