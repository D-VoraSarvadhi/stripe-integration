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
    makePaymentWithCard(amount, currency, cardNumber, cvc, expMonth, expYear, redirectUrl, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield this.stripe.paymentMethods.create({
                    type: 'card',
                    card: {
                        number: cardNumber,
                        cvc,
                        exp_month: expMonth,
                        exp_year: expYear,
                    },
                });
                const paymentIntent = yield this.stripe.paymentIntents.create({
                    amount,
                    currency,
                    payment_method: paymentMethod.id,
                    return_url: redirectUrl,
                    customer
                });
                return paymentIntent;
            }
            catch (error) {
                console.error('Error making payment:', error);
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
}
exports.StripeService = StripeService;
