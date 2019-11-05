import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const UpdateUserPassword: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Change Password',
    subtitle: settings.state.appname,
    children: null,
  })
}
