export const config: {
  environment: string
  stripe_key?: string
  segment_id?: string
  sentry_dsn?: string
  admin_domain_key: string
  api: string
  debug: boolean
} = {
  environment: process.env.REACT_APP_NODE_ENV || 'development',
  stripe_key: process.env.REACT_APP_STRIPE_KEY as string,
  segment_id: process.env.REACT_APP_SEGMENT_ID as string,
  sentry_dsn: process.env.REACT_APP_SENTRY_DSN as string,
  admin_domain_key: 'wga-domain-key-bb1fa928912c2d67753f8fcd7',
  api: 'http://localhost:4000',
  debug: true,
}
