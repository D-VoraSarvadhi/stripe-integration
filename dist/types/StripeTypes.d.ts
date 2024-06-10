import Stripe from "stripe";

export interface CustomerData {
    email: string;
    name: string;
}

export type StripeConfig = (secretKey: string) => Stripe;