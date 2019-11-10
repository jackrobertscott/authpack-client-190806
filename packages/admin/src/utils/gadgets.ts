import { Gadgets } from 'wga-plugin'
import { config } from '../config'

export const wga = new Gadgets({
  domain_key: config.admin_domain_key,
  devmode: config.devmode,
  team_required: true,
})
