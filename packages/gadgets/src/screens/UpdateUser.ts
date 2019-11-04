import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const UpdateUser: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Update User',
    subtitle: settings.state.appname,
    children: null,
  })
}
