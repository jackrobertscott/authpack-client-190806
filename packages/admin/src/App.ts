import { createElement as create, FC } from 'react'
import { Authpack } from '@authpack/react'
import { Spinner, Toaster } from '@authpack/theme'
import { Universal } from './utils/universal'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { Admin } from './screens/Admin'
import { Preferences } from './utils/preferences'
import { config } from './config'

export const App: FC = () => {
  return create(ErrorBoundary, {
    children: create(Preferences, {
      children: create(Universal, {
        children: create(Toaster, {
          children: create(Spinner, {
            children: create(Authpack, {
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
      }),
    }),
  })
}
