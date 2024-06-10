"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeConfig = void 0;
const stripe_1 = __importDefault(require("stripe"));
// import { StripeConfig } from '../types/index';
const stripeConfig = (secretKey) => {
    return new stripe_1.default(secretKey, {
        apiVersion: '2024-04-10',
    });
};
exports.stripeConfig = stripeConfig;
