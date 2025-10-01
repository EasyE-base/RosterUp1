import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export const PLATFORM_FEE_BPS = Number(process.env.STRIPE_CONNECT_APP_FEE_BPS || 500); // 5% default
