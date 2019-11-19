export const config: {
  environment: string
  stripeKey?: string
  segmentId?: string
  sentryDSN?: string
  api: string
  debug: boolean
} = {
  environment: process.env.REACT_APP_NODE_ENV || 'development',
  stripeKey: process.env.REACT_APP_STRIPE_KEY as string,
  segmentId: process.env.REACT_APP_SEGMENT_ID as string,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN as string,
  api: 'http://localhost:4000',
  debug: process.env.REACT_APP_NODE_ENV === 'development',
}
