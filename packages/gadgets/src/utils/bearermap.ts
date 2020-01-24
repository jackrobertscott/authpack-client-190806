import { KeyStore } from 'events-and-things'
import { config } from '../config'

export interface IBearermap {
  [key: string]: string
}

const options =
  config.environment === 'production' ? { secure: true } : undefined

export const Bearermap = new KeyStore<IBearermap>(
  {},
  'authpack.bearer',
  true,
  options
)
