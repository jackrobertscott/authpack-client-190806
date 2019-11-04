import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const ListProviders: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: '3rd Party Logins',
    subtitle: settings.state.appname,
    children: null,
  })
}
