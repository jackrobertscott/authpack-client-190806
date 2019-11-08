import { Gadgets } from 'wga-plugin'
import { config } from '../config'

export const wga = new Gadgets({
  domain_key: config.domain,
  devmode: true,
})
