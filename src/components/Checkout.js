import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: [],
      totalPrices: [],
    };
    this.totalPrice = this.totalPrice.bind(this);
    this.sumPrices = this.sumPrices.bind(this);
  }

  componentDidMount() {
    const quantity = localStorage.getItem('quantity');
    this.setState({
      quantity: JSON.parse(quantity),
    }, () => { this.totalPrice(); });
  }

  totalPrice() {
    const { filteredResults } = this.props;
    const { quantity } = this.state;
    const totalPrices = filteredResults.map(({ price }, index) => (
      parseFloat(price) * quantity[index])
      .toFixed(2));
    this.setState({
      totalPrices,
    });
  }

  sumPrices() {
    const { totalPrices } = this.state;
    return totalPrices.reduce((acc, curr) => acc + parseFloat(curr), 0);
  }

  render() {
    const { filteredResults } = this.props;
    const { totalPrices } = this.state;
    return (
      <div>
        <div>
          { filteredResults.map((product, index) => (
            <div key={ index }>
              <div>{product.title}</div>
              <div>{ totalPrices[index]}</div>
            </div>))}
        </div>
        <p>
          Total:
          { this.sumPrices() }
        </p>
        <div>
          <form>
            <label htmlFor="checkout-fullname">
              Nome completo:
              <input type="text" id="checkout-fullname" data-testid="checkout-fullname" />
            </label>
            <label htmlFor="checkout-email">
              Email:
              <input type="text" id="checkout-email" data-testid="checkout-email" />
            </label>
            <label htmlFor="checkout-cpf">
              CPF:
              <input type="text" id="checkout-cpf" data-testid="checkout-cpf" />
            </label>
            <label htmlFor="checkout-phone">
              Telefone:
              <input type="text" id="checkout-phone" data-testid="checkout-phone" />
            </label>
            <label htmlFor="checkout-cep">
              CEP:
              <input type="text" id="checkout-cep" data-testid="checkout-cep" />
            </label>
            <label htmlFor="checkout-address">
              Endereço:
              <input type="text" id="checkout-address" data-testid="checkout-address" />
            </label>
            <button type="button">Finalizar</button>
          </form>
          <div>
            <label htmlFor="payment-boleto">
              Boleto
              <input id="payment-boleto" type="checkbox" />
            </label>
            <p>Cartão de Crédito</p>
            <label htmlFor="payment-visa">
              Visa
              <input id="payment-visa" type="checkbox" />
            </label>
            <label htmlFor="payment-mastercard">
              Mastercard
              <input id="payment-mastercard" type="checkbox" />
            </label>
            <label htmlFor="payment-elo">
              Elo
              <input id="payment-elo" type="checkbox" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  filteredResults: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Checkout;
