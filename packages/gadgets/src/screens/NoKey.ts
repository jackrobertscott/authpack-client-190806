import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'

export const NoKey: FC<{
  loading: boolean
}> = ({ loading }) => {
  if (loading)
    return create(Focus, {
      icon: 'sync-alt',
      label: 'Loading',
      helper: 'Performing security checks',
    })
  return create(Focus, {
    icon: 'user-lock',
    label: 'Authenticator',
    helper: "Please provide your app's domain key",
    children: create(Button, {
      icon: 'question',
      label: 'Learn More',
      click: () => window.open('https://authenticator.windowgadgets.io'),
    }),
  })
}
