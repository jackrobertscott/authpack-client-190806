import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListMemberships: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Members',
    subtitle: settings.app && settings.app.name,
    children: null,
  })
}

const useListMemberships = createUseServer<{
  memberships: Array<{
    id: string
  }>
}>({
  query: `
    query wgaListMemberships {
      memberships: wgaListMemberships {
        id
      }
    }
  `,
})
