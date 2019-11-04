import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const ListMemberships: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Members',
    subtitle: settings.state.appname,
    children: null,
  })
}
