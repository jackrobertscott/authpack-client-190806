import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'
import { wga } from '../utils/wga'

export const Unauthenticated: FC = () => {
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
