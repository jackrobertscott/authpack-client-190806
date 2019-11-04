import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const LogoutUser: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Logout',
    subtitle: settings.state.appname,
    children: null,
  })
}
