import { Gadgets } from 'wga-plugin'
import { config } from '../config'

export const wga = new Gadgets({
  key_client: config.gadgets_key_client,
})
