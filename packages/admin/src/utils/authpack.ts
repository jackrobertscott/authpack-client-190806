import * as Authpack from '@authpack/sdk'
import { config } from '../config'

export const authpack = new Authpack.Gadgets({
  key: config.gadgets_key_client,
  options: {
    enable_teams: true,
    prompt_teams: true,
  },
})
