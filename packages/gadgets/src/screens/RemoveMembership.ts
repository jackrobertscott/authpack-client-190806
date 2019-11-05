import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const RemoveTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Danger Zone',
    subtitle: settings.state.appname,
    children: null,
  })
}

const useRemoveMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  name: 'RemoveMembership',
  query: `
    mutation RemoveMembership($id: String!) {
      membership: RemoveMembership(id: $id) {
        id
      }
    }
  `,
})
