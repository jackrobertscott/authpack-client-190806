export interface IGlobalConfigDefaults {
  environment: string
  stripeKey: string
  segmentId: string
  sentryDSN: string
}

const environment = process.env.REACT_APP_NODE_ENV || 'development'

const defaults: IGlobalConfigDefaults = {
  environment,
  stripeKey: process.env.REACT_APP_STRIPE_KEY as string,
  segmentId: process.env.REACT_APP_SEGMENT_ID as string,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN as string,
}

export interface IGlobalConfig extends IGlobalConfigDefaults {
  debug: boolean
}

let config: IGlobalConfig

switch (environment) {
  case 'production':
    config = {
      ...defaults,
      debug: false,
    }
    break
  default:
    config = {
      ...defaults,
      debug: true,
    }
    break
}

export default config
