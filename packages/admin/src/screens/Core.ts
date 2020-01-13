import { createElement as element, FC } from 'react'
import { Spinner } from '@authpack/theme'
import { AuthpackProvider } from '@authpack/react'
import { Preferences } from '../utils/preferences'
import { Universal } from '../utils/universal'
import { Admin } from '../screens/Admin'
import { authpack } from '../utils/authpack'

export const Core: FC = () => {
  return element(Preferences, {
    children: element(Universal, {
      children: element(Spinner, {
        children: element(AuthpackProvider, {
          children: element(Admin),
          value: authpack,
        }),
      }),
    }),
  })
}
