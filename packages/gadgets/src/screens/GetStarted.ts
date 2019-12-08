import { createElement as create, FC } from 'react'
import { Layout, Button, Focus } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'

export const GetStarted: FC<{
  login: () => void
  signup: () => void
}> = ({ login, signup }) => {
  const settings = useSettings()
  return create(Layout, {
    grow: true,
    children: create(Focus, {
      key: 'unlock',
      icon: 'unlock',
      label: settings.cluster ? settings.cluster.name : '',
      helper: 'Create an account or login',
      children: create(Layout, {
        column: true,
        divide: true,
        media: true,
        children: [
          create(Button, {
            key: 'login',
            icon: 'unlock',
            label: 'Login',
            click: login,
          }),
          create(Button, {
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
