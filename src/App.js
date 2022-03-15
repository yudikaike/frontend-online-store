import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';
import Carrinho from './components/Carrinho';
import Home from './components/Home';
import Filter from './components/Filter';
import ProductsDetail from './components/ProductsDetail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchQuery: '',
      categorySelected: false,
      products: [],
      cartProducts: [],
    };
    this.handleSearchByQuery = this.handleSearchByQuery.bind(this);
    this.OnClickSearch = this.OnClickSearch.bind(this);
    this.handleSearchByCategory = this.handleSearchByCategory.bind(this);
    this.addCartProducts = this.addCartProducts.bind(this);
  }

  componentDidMount() {
    const products = localStorage.getItem('products');
    if (products) {
      this.setState({
        products: JSON.parse(products),
      });
    }
  }

  componentDidUpdate() {
    const { products } = this.state;
    localStorage.setItem('products', JSON.stringify(products));
  }

  handleSearchByQuery({ target }) {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  }

  async handleSearchByCategory({ target }) {
    const { value } = target;
    const request = await getProductsFromCategoryAndQuery(value, '');
    const products = await request.results;
    this.setState({
      products,
      categorySelected: true,
    });
  }

  async OnClickSearch() {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      const request = await getProductsFromCategoryAndQuery('', inputValue);
      const products = await request.results;
      this.setState({
        products,
        searchQuery: request.query,
      });
    } else {
      this.setState({
        searchQuery: '',
      });
    }
  }

  addCartProducts({ target }) {
    const { value } = target;
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, value],
    }));
  }

  render() {
    const { searchQuery, products, categorySelected, cartProducts } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Filter handleSearchByCategory={ this.handleSearchByCategory } />
              <Home
                searchQuery={ searchQuery }
                products={ products }
                categorySelected={ categorySelected }
                handleSearchByQuery={ this.handleSearchByQuery }
                OnClickSearch={ this.OnClickSearch }
                addCartProducts={ this.addCartProducts }
              />
            </Route>
            <Route
              exact
              path="/carrinho"
            >
              <Carrinho
                products={ products }
                cartProducts={ cartProducts }
              />
            </Route>
            <Route
              exact
              path="/Products/:id"
              render={ (matchProps) => (<ProductsDetail
                { ...matchProps.match.params }
                addCartProducts={ this.addCartProducts }
                saveReview={ this.saveReview }
                onInputChange={ this.onInputChange }
                state={ this.state }
              />) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
