import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const LoginUser: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Login',
    subtitle: settings.state.appname,
    children: null,
  })
}
