import { createElement as create, FC } from 'react'
import { Focus, Button, Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const Devmode: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Create Membership',
    subtitle: settings.appname,
    children: create(Focus, {
      icon: 'code',
      label: 'Dev Mode',
      helper: 'Limited to 250 user accounts',
      children: create(Button, {
        icon: 'times',
        label: 'Okay',
        click: close,
      }),
    }),
  })
}
