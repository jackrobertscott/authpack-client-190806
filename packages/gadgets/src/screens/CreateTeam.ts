import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const CreateTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Create Team',
    subtitle: settings.state.appname,
    children: null,
  })
}
