import { Store } from 'events-and-things'
import { ITheme, BlueHarvester } from 'wga-theme'

export interface IConfigStore {
  environment: string
  stripeKey?: string
  segmentId?: string
  sentryDSN?: string
  api: string
  debug: boolean
  theme: ITheme
}

const defaults: IConfigStore = {
  environment: process.env.REACT_APP_NODE_ENV || 'development',
  stripeKey: process.env.REACT_APP_STRIPE_KEY as string,
  segmentId: process.env.REACT_APP_SEGMENT_ID as string,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN as string,
  api: 'http://localhost:4000',
  debug: true,
  theme: BlueHarvester,
}

export const ConfigStore = new Store<IConfigStore>(defaults)
