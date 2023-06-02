import React, { Component } from 'react';
import Heading from './Heading';

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = { info: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    } };
    this.change = this.change.bind(this);
  }

  change({ target: { name, value } }) {
    this.setState((prevState) => ({ info: { ...prevState.info, [name]: value } }));
  }

  render() {
    return (
      <form>
        <fieldset>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
            name="name"
            onChange={ this.change }
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={ this.change }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
            name="cpf"
            onChange={ this.change }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
            name="phone"
            onChange={ this.change }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
            name="cep"
            onChange={ this.change }
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            name="address"
            onChange={ this.change }
          />
        </fieldset>
        <fieldset>
          <Heading text="Método de pagamento" />
          <section>
            <p>Boleto</p>
            <input
              type="radio"
              name="payment"
              value="Boleto"
              onChange={ this.change }
            />
          </section>
          <section>
            <p>Cartão de Crédito</p>
            <label htmlFor="visa-payment">
              <input
                id="visa-payment"
                type="radio"
                name="payment"
                value="Visa"
                onChange={ this.change }
              />
              Visa
            </label>
            <label htmlFor="mastercard-payment">
              <input
                id="mastercard-payment"
                type="radio"
                name="payment"
                value="MasterCard"
                onChange={ this.change }
              />
              MasterCard
            </label>
            <label htmlFor="elo-payment">
              <input
                id="elo-payment"
                type="radio"
                name="payment"
                value="Elo"
                onChange={ this.change }
              />
              Elo
            </label>
          </section>
        </fieldset>
        <button type="button">Comprar</button>
      </form>
    );
  }
}

export default CheckoutForm;
