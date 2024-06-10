import Stripe from 'stripe';
import { CustomerData } from '../types/StripeTypes';
export declare class StripeService {
    private stripe;
    constructor(apiKey: string);
    createCustomer(data: CustomerData): Promise<Stripe.Response<Stripe.Customer>>;
}
