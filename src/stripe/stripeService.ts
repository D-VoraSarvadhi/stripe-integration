import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-04-10'
    });
  }

  async createCustomer(data: { email: string; name: string; }): Promise<Stripe.Customer | undefined> {
    try {
      const customer = await this.stripe.customers.create({
        email: data.email,
        name: data.name,
      });
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      return undefined;
    }
  }

  async existingCustomer(data: { email: string }): Promise<Stripe.Customer | undefined> {
    try {
      const customers = await this.stripe.customers.list({
        email: data.email,
        limit: 1,
      });
      if (customers.data.length > 0) {
        return customers.data[0];
      }
  
      return undefined;
    } catch (error) {
      console.error('Error getting customer:', error);
      return undefined;
    }
  }

  async createPaymentMethod(data: {
    type: 'card';
    cardNumber: string;
    cvc: string;
    expMonth: number;
    expYear: number;
  }): Promise<Stripe.PaymentMethod | undefined> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: data.type,
        card: {
          number: data.cardNumber,
          cvc: data.cvc,
          exp_month: data.expMonth,
          exp_year: data.expYear,
        },
      });
      return paymentMethod;
    } catch (error) {
      console.error('Error creating payment method:', error);
      return undefined;
    }
  }

  async createPaymentIntent(data: {
    amount: number;
    currency: string;
    paymentMethodId: string;
    redirectUrl: string;
    customer: string;
    confirm: boolean;
    use_stripe_sdk: boolean;
    description?: string;
  }): Promise<Stripe.PaymentIntent | undefined> {
    try {
      const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
        amount: data.amount,
        currency: data.currency,
        payment_method: data.paymentMethodId,
        return_url: data.redirectUrl,
        customer: data.customer,
        confirm: data.confirm,
        use_stripe_sdk: data.use_stripe_sdk,
      };
  
      if (data.description) {
        paymentIntentParams.description = data.description;
      }
  
      const paymentIntent = await this.stripe.paymentIntents.create(paymentIntentParams);
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return undefined;
    }
  }  

  async cancelPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent | undefined> {
    try {
      const canceledPaymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
      return canceledPaymentIntent;
    } catch (error) {
      console.error('Error canceling payment:', error);
      return undefined;
    }
  }

  async createPrice(currency: string, unit_amount: number, product_name: string): Promise<Stripe.Price | undefined> {
    try {
      const price = await this.stripe.prices.create({
        currency: currency,
        unit_amount: unit_amount,
        product_data: {
          name: product_name,
        },
      });
      return price;
    } catch (error) {
      console.error('Error creating price:', error);
      return undefined;
    }
  }

  async createSession(success_url: string, cancel_url: string, customer: string, price_id: string): Promise<Stripe.Checkout.Session | undefined> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        success_url,
        cancel_url,
        customer,
        payment_method_types: ['card'],
        line_items: [
          {
            price: price_id,
            quantity: 1,
          },
        ],
        mode: 'payment',
      });
      return session;
    } catch (error) {
      console.error('Error creating session:', error);
      return undefined;
    }
  }

  async retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session | undefined> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      console.error('Error retrieving session:', error);
      return undefined;
    }
  }

  async createRefund(paymentIntentId: string, amount: number): Promise<Stripe.Refund | undefined> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount
      });
      return refund;
    } catch (error) {
      console.error('Error creating refund:', error);
      return undefined;
    }
  }

}
