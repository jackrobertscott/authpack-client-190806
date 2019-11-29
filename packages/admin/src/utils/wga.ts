import { Gadgets } from 'wga-plugin'
import { config } from '../config'

export const wga = new Gadgets({
  key: config.gadgets_key_client,
  enable_teams: true,
  prompt_teams: true,
})
