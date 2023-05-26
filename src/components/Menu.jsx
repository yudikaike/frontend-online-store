import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Menu extends Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { setCategoryId } = this.props;
    return (
      categories.map(({ id, name }, index) => (
        <label data-testid="category" htmlFor={ `category-${index}` } key={ index }>
          <input
            id={ `category-${index}` }
            type="radio"
            name="category"
            value={ id }
            onClick={ setCategoryId }
          />
          { name }
        </label>
      ))
    );
  }
}

Menu.propTypes = {
  setCategoryId: PropTypes.func.isRequired,
};

export default Menu;
