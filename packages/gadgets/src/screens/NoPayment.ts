import { createElement as create, FC } from 'react'
import { Focus, Button } from '@authpack/theme'

export const NoPayment: FC = () => {
  return create(Focus, {
    icon: 'user-lock',
    label: 'Authpack',
    helper: 'Please add a payment card to your Authpack settings',
    children: create(Button, {
      prefix: 'far',
      icon: 'question-circle',
      label: 'Learn More',
      click: () => window.open('https://authpack.io/price'),
    }),
  })
}
