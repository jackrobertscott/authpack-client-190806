import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const SwitchTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Switch Team',
    subtitle: settings.state.appname,
    children: null,
  })
}
