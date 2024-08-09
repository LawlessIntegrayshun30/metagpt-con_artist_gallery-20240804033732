## client/src/components/CheckoutForm.js
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PaymentService from '../../services/PaymentService';
import PrintFulfillmentService from '../../services/PrintFulfillmentService';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDetails: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
      },
      orderDetails: {
        artworkId: '',
        printSize: 'default',
        frameStyle: 'default'
      },
      isLoading: false,
      paymentError: null,
      orderError: null,
      paymentConfirmation: null,
      orderConfirmation: null
    };

    this.paymentService = new PaymentService();
    this.printFulfillmentService = new PrintFulfillmentService();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      paymentDetails: {
        ...prevState.paymentDetails,
        [name]: value
      }
    }));
  };

  handleOrderChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      orderDetails: {
        ...prevState.orderDetails,
        [name]: value
      }
    }));
  };

  submitPayment = async () => {
    this.setState({ isLoading: true });
    try {
      const paymentConfirmation = await this.paymentService.processPayment(this.state.paymentDetails);
      this.setState({ paymentConfirmation, isLoading: false });
      return paymentConfirmation;
    } catch (error) {
      this.setState({ paymentError: error, isLoading: false });
      throw error;
    }
  };

  confirmOrder = async () => {
    this.setState({ isLoading: true });
    try {
      const orderConfirmation = await this.printFulfillmentService.createOrder(this.state.orderDetails);
      this.setState({ orderConfirmation, isLoading: false });
      return orderConfirmation;
    } catch (error) {
      this.setState({ orderError: error, isLoading: false });
      throw error;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const paymentConfirmation = await this.submitPayment();
      if (paymentConfirmation) {
        const orderConfirmation = await this.confirmOrder();
        alert(`Order confirmed! Payment ID: ${paymentConfirmation.id}, Order ID: ${orderConfirmation.id}`);
      }
    } catch (error) {
      alert(`Error processing the transaction: ${error.message}`);
    }
  };

  render() {
    const { paymentDetails, orderDetails, isLoading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Checkout</h2>
        {/* Payment Details */}
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nameOnCard">Name on Card:</label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            value={paymentDetails.nameOnCard}
            onChange={this.handleInputChange}
            required
          />
        </div>
        {/* Order Details */}
        <div>
          <label htmlFor="artworkId">Artwork ID:</label>
          <input
            type="text"
            id="artworkId"
            name="artworkId"
            value={orderDetails.artworkId}
            onChange={this.handleOrderChange}
            required
          />
        </div>
        <div>
          <label htmlFor="printSize">Print Size:</label>
          <select
            id="printSize"
            name="printSize"
            value={orderDetails.printSize}
            onChange={this.handleOrderChange}
          >
            <option value="default">Select size</option>
            {/* Additional print sizes can be added here */}
          </select>
        </div>
        <div>
          <label htmlFor="frameStyle">Frame Style:</label>
          <select
            id="frameStyle"
            name="frameStyle"
            value={orderDetails.frameStyle}
            onChange={this.handleOrderChange}
          >
            <option value="default">Select style</option>
            {/* Additional frame styles can be added here */}
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    );
  }
}

// Define propTypes for CheckoutForm component
CheckoutForm.propTypes = {
  paymentService: PropTypes.instanceOf(PaymentService),
  printFulfillmentService: PropTypes.instanceOf(PrintFulfillmentService)
};

export default CheckoutForm;
