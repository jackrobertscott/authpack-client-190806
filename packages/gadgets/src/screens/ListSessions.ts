import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListSessions: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Sessions',
    subtitle: settings.appname,
    children: null,
  })
}

const useListSessions = createUseServer<{
  sessions: Array<{
    id: string
  }>
}>({
  query: `
    query wgaListSessions($options: FilterOptions) {
      sessions: wgaListSessions(options: $options) {
        id
      }
    }
  `,
})
