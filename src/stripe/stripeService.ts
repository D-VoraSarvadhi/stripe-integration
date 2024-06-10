import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
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
}
