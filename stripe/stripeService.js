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
        this.stripe = new stripe_1.default(secretKey);
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
                const paymentIntent = yield this.stripe.paymentIntents.create({
                    amount: data.amount,
                    currency: data.currency,
                    payment_method: data.paymentMethodId,
                    return_url: data.redirectUrl,
                    customer: data.customer,
                });
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
    createCheckoutSession(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield this.stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [{
                            price_data: {
                                currency: data.currency,
                                product_data: {
                                    name: data.productName,
                                },
                                unit_amount: data.amount,
                            },
                            quantity: 1,
                        }],
                    mode: 'payment',
                    success_url: data.successUrl,
                    cancel_url: data.cancelUrl,
                    customer: data.customer,
                });
                return session;
            }
            catch (error) {
                console.error('Error creating checkout session:', error);
                return undefined;
            }
        });
    }
}
exports.StripeService = StripeService;
