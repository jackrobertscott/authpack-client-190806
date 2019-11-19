import { createElement as create, FC } from 'react'
import { Focus, Button, Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'

export const Power: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Power',
    subtitle: settings.app && settings.app.name,
    children: create(Focus, {
      icon: 'power-off',
      label: 'Power',
      helper: 'Your gadgets are currently off',
      children: create(Button, {
        icon: 'times',
        label: 'Okay',
        click: () => SettingsStore.update({ open: false }),
      }),
    }),
  })
}
