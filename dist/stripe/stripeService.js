"use strict";
// // src/stripe/StripeService.ts
// import Stripe from 'stripe';
// import { stripeConfig } from './stripeConfig';
// // import { CustomerData } from '../types/index';
// export class StripeService {
//   private stripe: Stripe;
//   constructor(apiKey: string) {
//     this.stripe = stripeConfig(apiKey);
//   }
//   public async createCustomer(data: { email: any; name: any; }) {
//     return this.stripe.customers.create({
//       email: data.email,
//       name: data.name,
//     });
//   }
// }
