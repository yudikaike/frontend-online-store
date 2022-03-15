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
    }, () => { this.totalPrice() });
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
        <p>Total: 
            { this.sumPrices() }
        </p>
        <div>
          <form>
            <label>
              Nome completo:
              <input type="text" data-testid="checkout-fullname" />
            </label>
            <label>
              Email:
              <input type="text" data-testid="checkout-email" />
            </label>
            <label>
              CPF:
              <input type="text" data-testid="checkout-cpf" />
            </label>
            <label>
              Telefone:
              <input type="text" data-testid="checkout-phone" />
            </label>
            <label>
              CEP:
              <input type="text" data-testid="checkout-cep" />
            </label>
            <label>
              Endereço:
              <input type="text" data-testid="checkout-address" />
            </label>
            <button type="button">Finalizar</button>
          </form>
          <div>
            <label>
              Boleto
              <input type="checkbox" />
            </label>
            <p>Cartão de Crédito</p>
            <label>
              Visa
              <input type="checkbox" />
            </label>
            <label>
              Mastercard
              <input type="checkbox" />
            </label>
            <label>
              Elo
              <input type="checkbox" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
