import Stripe from 'stripe';
import { CustomerData } from '../types/index';
export declare class StripeService {
    private stripe;
    constructor(apiKey: string);
    createCustomer(data: CustomerData): Promise<Stripe.Response<Stripe.Customer>>;
}
