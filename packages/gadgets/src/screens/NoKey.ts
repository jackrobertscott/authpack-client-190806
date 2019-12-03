import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'

export const NoKey: FC = () => {
  return create(Focus, {
    icon: 'user-lock',
    label: 'Authpack',
    helper: "Please provide your cluster's client key",
    children: create(Button, {
      icon: 'question',
      label: 'Learn More',
      click: () =>
        window.open(
          'https://github.com/jackrobertscott/authpack/blob/master/readme.md'
        ),
    }),
  })
}
