import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'
import { wga } from '../utils/wga'

export const Unauthenticated: FC = () => {
  return create(Focus, {
    icon: 'unlock',
    label: 'Welcome',
    helper: 'User and Team API and Dashboard',
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
