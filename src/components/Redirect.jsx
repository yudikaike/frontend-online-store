import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Redirect extends Component {
  render() {
    const { id, path, text } = this.props;
    return (<Link data-testid={ id } to={ `${path}` }>{ text }</Link>);
  }
}

Redirect.propTypes = {
  id: PropTypes.string,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Redirect.defaultProps = {
  id: '',
};
