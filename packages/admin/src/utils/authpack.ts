import { Authpack } from '@authpack/sdk'
import { config } from '../config'

export const authpack = new Authpack({
  debug: true,
  key: config.gadgets_key_client,
  url: document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : undefined,
})
