import * as Authpack from 'wga-plugin'
import { config } from '../config'

export const wga = new Authpack.Gadgets({
  key: config.gadgets_key_client,
  enable_teams: true,
  prompt_teams: true,
})
