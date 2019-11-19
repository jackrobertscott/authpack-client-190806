import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListCredentials: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Credentials',
    subtitle: settings.app && settings.app.name,
    children: null,
  })
}
