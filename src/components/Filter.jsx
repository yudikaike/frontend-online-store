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
    this.funcTeste();
  }

  funcTeste = () => {
    api.getCategories().then((categorie) => {
      this.setState({ categories: categorie });
    });
  }

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        {categories.map((categorie) => (
          <label data-testid="category" key={ categorie.id } htmlFor="input-categoty">
            { categorie.name }
            <input type="radio" id="input-categoty" />
          </label>
        ))}
      </div>
    );
  }
}

export default Filter;
