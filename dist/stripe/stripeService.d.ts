import Stripe from 'stripe';
export declare class StripeService {
    private stripe;
    constructor(apiKey: string);
    createCustomer(data: {
        email: any;
        name: any;
    }): Promise<Stripe.Response<Stripe.Customer>>;
}
