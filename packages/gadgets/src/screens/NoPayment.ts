import { createElement as element, FC } from 'react'
import { Focus, Button } from '@authpack/theme'

export const NoPayment: FC = () => {
  return element(Focus, {
    icon: 'user-lock',
    label: 'Authpack',
    helper: 'Please add a payment card to your Authpack settings',
    children: element(Button, {
      prefix: 'far',
      icon: 'question-circle',
      label: 'Learn More',
      click: () => window.open('https://authpack.io/price'),
    }),
  })
}
