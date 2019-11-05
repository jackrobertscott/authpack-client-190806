import { ConfigStore } from './config'

export const stripe = (window as any).Stripe(ConfigStore.state.stripeKey)
