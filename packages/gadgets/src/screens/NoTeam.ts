import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'

export const NoTeam: FC<{
  close: () => void
}> = ({ close }) => {
  return create(Focus, {
    icon: 'users',
    label: 'Team',
    helper: 'Finish signing up by creating a team',
    children: create(Button, {
      icon: 'plus',
      label: 'Okay',
      click: close,
    }),
  })
}
