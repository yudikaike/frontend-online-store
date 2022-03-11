import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    api.getCategories().then((category) => {
      this.setState({ categories: category });
    });
  }

  render() {
    const { categories } = this.state;
    const { handleSearchByCategory } = this.props;
    return (
      <div>
        {categories.map((category) => (
          <label
            data-testid="category"
            key={ category.id }
            htmlFor={ `input-category-${category.name}` }
          >
            <input
              onClick={ handleSearchByCategory }
              name="category-radio"
              value={ category.id }
              type="radio"
              id={ `input-category-${category.name}` }
            />
            { category.name }
          </label>
        ))}
      </div>
    );
  }
}

Filter.propTypes = {
  handleSearchByCategory: PropTypes.func.isRequired,
};

export default Filter;
