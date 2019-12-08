import { createElement as create, FC } from 'react'
import { Spinner } from '@authpack/theme'
import { Universal } from './utils/universal'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { Admin } from './screens/Admin'
import { Preferences } from './utils/preferences'

export const App: FC = () => {
  return create(ErrorBoundary, {
    children: create(Preferences, {
      children: create(Spinner, {
        children: create(Universal, {
          children: create(Admin),
        }),
      }),
    }),
  })
}
