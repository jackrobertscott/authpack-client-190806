import { Gadgets } from 'wga-plugin'
import { config } from '../config'

export const wga = new Gadgets({
  domain_key: config.domain,
  team_required: true,
  devmode: true,
})
