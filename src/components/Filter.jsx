import React from 'react';
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
    return (
      <div>
        {categories.map((category) => (
          <label data-testid="category" key={ category.id } htmlFor="input-category">
            { category.name }
            <input type="radio" id="input-category" />
          </label>
        ))}
      </div>
    );
  }
}

export default Filter;
