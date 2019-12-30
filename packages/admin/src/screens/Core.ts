import { createElement as element, FC } from 'react'
import { Spinner } from '@authpack/theme'
import { Preferences } from '../utils/preferences'
import { Universal } from '../utils/universal'
import { AuthpackProvider } from '../utils/authpack'
import { Admin } from '../screens/Admin'

export const Core: FC = () => {
  return element(Preferences, {
    children: element(Universal, {
      children: element(Spinner, {
        children: element(AuthpackProvider, {
          children: element(Admin),
        }),
      }),
    }),
  })
}
