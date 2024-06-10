"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeInitializer = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeInitializer {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    initialize() {
        return new stripe_1.default(this.secretKey);
    }
}
exports.StripeInitializer = StripeInitializer;
