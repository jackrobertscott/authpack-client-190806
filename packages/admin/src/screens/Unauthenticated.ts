import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'
import { wga } from '../utils/gadgets'

export const Unauthenticated: FC<{
  loading: boolean
}> = ({ loading }) => {
  if (loading)
    return create(Focus, {
      icon: 'sync-alt',
      label: 'Loading',
      helper: 'Performing security checks',
    })
  return create(Focus, {
    icon: 'unlock',
    label: 'Welcome',
    helper: 'Supercharge your app with Authenticator',
    children: [
      create(Button, {
        key: 'login',
        icon: 'bolt',
        label: 'Get Started',
        click: () => wga.show(),
      }),
    ],
  })
}
