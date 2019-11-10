import { config } from '../config'

export const stripe = (window as any).Stripe(config.stripe_key)
