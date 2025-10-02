import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

/**
 * Get or create Stripe instance (lazy initialization)
 * This prevents errors during build when STRIPE_SECRET_KEY is not available
 */
export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2024-11-20.acacia',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Export for backwards compatibility - will initialize on first access
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  }
});

export const PLATFORM_FEE_BPS = Number(process.env.STRIPE_CONNECT_APP_FEE_BPS || 500); // 5% default
