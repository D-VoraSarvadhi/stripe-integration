import Stripe from "stripe";

export interface StripeConfig {
    (secretKey: string): Stripe;
}