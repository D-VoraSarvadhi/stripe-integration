import Stripe from 'stripe';
import { StripeConfig } from '../types/StripeTypes';

export const stripeConfig: StripeConfig = (secretKey) => {
    return new Stripe(secretKey);
};