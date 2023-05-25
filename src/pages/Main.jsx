import React, { Component } from 'react';
import { Header, Heading } from '../components';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Header />
        <Heading
          id="home-initial-message"
          text="Digite algum termo de pesquisa ou escolha uma categoria."
        />
      </main>
    );
  }
}
