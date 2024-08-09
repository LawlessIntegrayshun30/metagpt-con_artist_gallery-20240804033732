## services/PaymentService.js
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your actual Stripe secret key

class PaymentService {
  constructor() {
    // Stripe secret key should be set as an environment variable in production
    this.stripe = stripe;
  }

  /**
   * Process a payment with the given payment details.
   * @param {object} paymentDetails - The payment details including card information and amount.
   * @returns {Promise<object>} - A promise that resolves with the payment confirmation details.
   */
  async processPayment(paymentDetails) {
    if (!paymentDetails || typeof paymentDetails !== 'object') {
      throw new Error('Invalid payment details provided');
    }

    const { amount, currency = 'usd', source, description = 'Artwork purchase' } = paymentDetails;

    if (!amount || !source) {
      throw new Error('Amount and source are required for processing payment');
    }

    try {
      const charge = await this.stripe.charges.create({
        amount: amount, // Amount in cents
        currency: currency,
        source: source,
        description: description
      });

      return {
        id: charge.id,
        status: charge.status,
        amount: charge.amount,
        currency: charge.currency,
        created: charge.created,
        description: charge.description,
        payment_method: charge.payment_method_details.type
      };
    } catch (error) {
      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }
}

module.exports = PaymentService;
