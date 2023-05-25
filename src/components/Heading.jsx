import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Heading extends Component {
  render() {
    const { id, text } = this.props;
    return (<h2 data-testid={ id }>{ text }</h2>);
  }
}

Heading.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Heading.defaultProps = {
  id: '',
};
