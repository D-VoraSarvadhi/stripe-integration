"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeService {
    constructor(secretKey) {
        this.stripe = new stripe_1.default(secretKey, {
            apiVersion: '2024-04-10'
        });
    }
    createCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield this.stripe.customers.create({
                    email: data.email,
                    name: data.name,
                });
                return customer;
            }
            catch (error) {
                console.error('Error creating customer:', error);
                return undefined;
            }
        });
    }
    existingCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield this.stripe.customers.list({
                    email: data.email,
                    limit: 1,
                });
            }
            catch (error) {
                console.error('Error getting customer:', error);
                return undefined;
            }
        });
    }
    createPaymentMethod(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield this.stripe.paymentMethods.create({
                    type: data.type,
                    card: {
                        number: data.cardNumber,
                        cvc: data.cvc,
                        exp_month: data.expMonth,
                        exp_year: data.expYear,
                    },
                });
                return paymentMethod;
            }
            catch (error) {
                console.error('Error creating payment method:', error);
                return undefined;
            }
        });
    }
    createPaymentIntent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentIntentParams = {
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
                const paymentIntent = yield this.stripe.paymentIntents.create(paymentIntentParams);
                return paymentIntent;
            }
            catch (error) {
                console.error('Error creating payment intent:', error);
                return undefined;
            }
        });
    }
    cancelPayment(paymentIntentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const canceledPaymentIntent = yield this.stripe.paymentIntents.cancel(paymentIntentId);
                return canceledPaymentIntent;
            }
            catch (error) {
                console.error('Error canceling payment:', error);
                return undefined;
            }
        });
    }
    createPrice(currency, unit_amount, product_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const price = yield this.stripe.prices.create({
                    currency: currency,
                    unit_amount: unit_amount,
                    product_data: {
                        name: product_name,
                    },
                });
                return price;
            }
            catch (error) {
                console.error('Error creating price:', error);
                return undefined;
            }
        });
    }
    createSession(success_url, cancel_url, customer, price_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield this.stripe.checkout.sessions.create({
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
            }
            catch (error) {
                console.error('Error creating session:', error);
                return undefined;
            }
        });
    }
    retrieveSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield this.stripe.checkout.sessions.retrieve(sessionId);
                return session;
            }
            catch (error) {
                console.error('Error retrieving session:', error);
                return undefined;
            }
        });
    }
}
exports.StripeService = StripeService;
