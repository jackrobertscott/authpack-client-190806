import { createElement as create, FC } from 'react'
import { Layout, Button, Focus } from 'wga-theme'
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
      label: settings.app ? settings.app.name : 'Welcome',
      helper: 'Create an account or login',
      children: create(Layout, {
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
            label: 'Sign Up',
            click: signup,
          }),
        ],
      }),
    }),
  })
}
