import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ReviewForm extends Component {
  constructor() {
    super();
    this.state = { review: { email: '', rate: '', comment: '' } };
    this.change = this.change.bind(this);
  }

  change({ target: { name, value } }) {
    const { review } = this.state;
    this.setState({ review: { ...review, [name]: value } });
  }

  render() {
    const { review } = this.state;
    const { submit } = this.props;
    const rates = ['1', '2', '3', '4', '5'];
    return (
      <form>
        <fieldset>
          <input
            data-testid="product-detail-email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={ this.change }
          />
          { rates.map((rate, index) => (
            <label key={ index } htmlFor={ `${rate}-rating` }>
              <input
                data-testid={ `${rate}-rating` }
                id={ `${rate}-rating` }
                type="radio"
                value={ rate }
                name="rate"
                onChange={ this.change }
              />
              { rate }
            </label>
          )) }
          <textarea
            data-testid="product-detail-evaluation"
            name="comment"
            onChange={ this.change }
          />
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ () => submit(review) }
          >
            Enviar
          </button>
        </fieldset>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
