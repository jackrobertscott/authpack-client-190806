import { createElement as element, FC } from 'react'
import { Focus, Button } from '@authpack/theme'

export const NoKey: FC = () => {
  return element(Focus, {
    icon: 'user-lock',
    label: 'Authpack',
    helper: "Please provide your cluster's client key",
    children: element(Button, {
      prefix: 'far',
      icon: 'question-circle',
      label: 'Learn More',
      click: () =>
        window.open('https://github.com/jackrobertscott/authpack-client/wiki'),
    }),
  })
}
