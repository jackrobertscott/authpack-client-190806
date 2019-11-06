import { createElement as create, FC } from 'react'
import { Focus, Button } from 'wga-theme'

export const Devmode: FC<{
  close: () => void
}> = ({ close }) =>
  create(Focus, {
    icon: 'code',
    label: 'Dev Mode',
    helper: 'Limited to 250 user accounts',
    children: create(Button, {
      icon: 'times',
      label: 'Back',
      click: close,
    }),
  })
