import { createElement as element, FC } from 'react'
import { Spinner } from '@authpack/theme'
import { Preferences } from '../utils/preferences'
import { Universal } from '../utils/universal'
import { Admin } from '../screens/Admin'
import { config } from '../config'
import * as Authpack from '../utils/authpack'

export const Core: FC = () => {
  return element(Preferences, {
    children: element(Universal, {
      children: element(Spinner, {
        children: element(Authpack.Provider, {
          children: element(Admin),
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
