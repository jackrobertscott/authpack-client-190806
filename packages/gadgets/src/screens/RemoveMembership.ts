import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const RemoveTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Danger Zone',
    subtitle: settings.app && settings.app.name,
    children: null,
  })
}

const useRemoveMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation wgaRemoveMembership($id: String!) {
      membership: wgaRemoveMembership(id: $id) {
        id
      }
    }
  `,
})
