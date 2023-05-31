import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Reviews extends Component {
  render() {
    const { id, reviews } = this.props;
    return (
      reviews[id] ? reviews[id].map(({ email, rate, comment }, index) => (
        <div key={ index }>
          <p>{ email }</p>
          <p>{ rate }</p>
          <p>{ comment }</p>
        </div>
      )) : null
    );
  }
}

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
  reviews: PropTypes.shape({
    email: PropTypes.string,
    rate: PropTypes.string,
    evaluation: PropTypes.string,
  }).isRequired,
};
