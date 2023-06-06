import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading, Redirect, ReviewForm, Reviews } from '../components';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { product: {}, reviews: {}, cart: [], quantity: 0, isDone: false };
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
    this.getQuantity(cart);
    if (cart) this.setState({ cart });
  }

  getQuantity(cart) {
    const quantity = cart.reduce((total, product) => total + product.quantity, 0);
    this.setState({ quantity });
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
      if (cart[index].quantity < cart[index].available_quantity) {
        cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
      } else return;
      this.setState({
        cart, quantity: cart.reduce((total, { quantity }) => total + quantity, 0),
      });
    } else {
      this.setState(
        {
          cart: [...cart, { ...product, quantity: 1 }],
          quantity: cart.reduce((total, { quantity }) => total + quantity, 0),
        },
      );
    }
    this.getQuantity(cart);
  }

  render() {
    const { product, reviews, quantity, isDone } = this.state;
    return (
      <main>
        <Redirect id="shopping-cart-button" path="/cart" text="🛒" />
        <span data-testid="shopping-cart-size">{ quantity }</span>
        <Redirect path="/" text="↩️" />
        { isDone && (
          <section>
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
          </section>) }
      </main>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
