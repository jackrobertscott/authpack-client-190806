import { createElement as element, FC } from 'react'
import { Layout, Button, Focus } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'

export const GetStarted: FC<{
  login: () => void
  signup: () => void
}> = ({ login, signup }) => {
  const settings = useSettings()
  return element(Layout, {
    grow: true,
    children: element(Focus, {
      key: 'unlock',
      icon: 'unlock',
      label: settings.cluster ? settings.cluster.name : '',
      helper: 'Create an account or login',
      children: element(Layout, {
        column: true,
        divide: true,
        media: true,
        children: [
          element(Button, {
            key: 'login',
            icon: 'unlock',
            label: 'Login',
            click: login,
          }),
          element(Button, {
            key: 'signup',
            icon: 'plus',
            label: 'Signup',
            click: signup,
          }),
        ],
      }),
    }),
  })
}
