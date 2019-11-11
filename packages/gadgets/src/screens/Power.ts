import { createElement as create, FC } from 'react'
import { Focus, Button, Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const Power: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Power',
    subtitle: settings.appname,
    children: create(Focus, {
      icon: 'power-off',
      label: 'Power',
      helper: 'Your gadgets are currently off',
      children: create(Button, {
        icon: 'times',
        label: 'Okay',
        click: close,
      }),
    }),
  })
}
