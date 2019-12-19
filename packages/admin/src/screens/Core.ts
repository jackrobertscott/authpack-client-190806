import { createElement as create, FC } from 'react'
import { Spinner } from '@authpack/theme'
import { Preferences } from '../utils/preferences'
import { Universal } from '../utils/universal'
import { Admin } from '../screens/Admin'
import { config } from '../config'
import * as Authpack from '../utils/authpack'

export const Core: FC = () => {
  return create(Preferences, {
    children: create(Universal, {
      children: create(Spinner, {
        children: create(Authpack.Provider, {
          children: create(Admin),
          value: {
            debug: true,
            key: config.gadgets_key_client,
            url: document.location.hostname.includes('localhost')
              ? 'http://localhost:3100'
              : undefined,
            options: {
              enable_teams: true,
              prompt_teams: true,
            },
          },
        }),
      }),
    }),
  })
}
