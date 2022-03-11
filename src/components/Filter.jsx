import React from 'react';
import * as api from '../services/api';

class Filter extends React.Component {
  render() {
    // console.log(nomes);

    return (
      <div>
        {api.getCategories().then((categories) => { categories.map(({ name }) => console.log(name)); })}
      </div>
    );
  }
}

export default Filter;
