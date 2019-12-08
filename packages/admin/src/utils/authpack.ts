import * as Authpack from '@authpack/sdk'
import { config } from '../config'

export const authpack = new Authpack.Gadgets({
  debug: true,
  key: config.gadgets_key_client,
  url: document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : undefined,
  options: {
    enable_teams: true,
    prompt_teams: true,
  },
})
