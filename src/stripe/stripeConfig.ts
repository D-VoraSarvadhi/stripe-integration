import Stripe from 'stripe';
import { StripeConfig } from '../types/StripeTypes';

export class StripeInitializer {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    initialize(): Stripe {
        return new Stripe(this.secretKey);
    }
}
