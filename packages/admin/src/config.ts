export const config: {
  environment: string
  stripeKey?: string
  segmentId?: string
  sentryDSN?: string
  api: string
  debug: boolean
  domain: string
} = {
  environment: process.env.REACT_APP_NODE_ENV || 'development',
  stripeKey: process.env.REACT_APP_STRIPE_KEY as string,
  segmentId: process.env.REACT_APP_SEGMENT_ID as string,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN as string,
  api: 'http://localhost:4000',
  debug: true,
  domain: 'wga-domain-key-79aeda5fd1178c9486d6925cc',
}
