export const config: {
  environment: string
  stripe_key?: string
  segment_id?: string
  sentry_dsn?: string
  gadgets_key_client: string
  api: string
  debug: boolean
  documents: string
} = {
  environment: process.env.REACT_APP_NODE_ENV || 'development',
  stripe_key: process.env.REACT_APP_STRIPE_KEY as string,
  segment_id: process.env.REACT_APP_SEGMENT_ID as string,
  sentry_dsn: process.env.REACT_APP_SENTRY_DSN as string,
  gadgets_key_client: process.env.REACT_APP_WGA_DOMAIN as string,
  api: process.env.REACT_APP_WGA_API as string,
  debug: process.env.REACT_APP_NODE_ENV !== 'production',
  documents: 'https://www.notion.so/Documents-5aacd2c94989476283d0e18117e490c4',
}
