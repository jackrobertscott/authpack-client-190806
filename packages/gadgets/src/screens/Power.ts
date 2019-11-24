import { createElement as create, FC } from 'react'
import { Focus, Button, Page } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'

export const Power: FC = () => {
  const settings = useSettings()
  return create(Page, {
    title: 'Power',
    subtitle: settings.cluster && settings.cluster.name,
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
