import Stripe from "stripe";
interface StripeConfig {
    (secretKey: string): Stripe;
}
declare const stripeConfig: StripeConfig;
export default stripeConfig;
