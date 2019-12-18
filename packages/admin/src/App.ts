import * as Authpack from '@authpack/react'
import { createElement as element, FC } from 'react'
import { Spinner, Toaster } from '@authpack/theme'
import { Universal } from './utils/universal'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { Admin } from './screens/Admin'
import { Preferences } from './utils/preferences'
import { config } from './config'

export const App: FC = () => {
  return element(ErrorBoundary, {
    children: element(Preferences, {
      children: element(Universal, {
        children: element(Toaster, {
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
      }),
    }),
  })
}
