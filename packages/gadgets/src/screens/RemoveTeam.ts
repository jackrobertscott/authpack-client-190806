import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const RemoveTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Danger Zone',
    subtitle: settings.appname,
    children: null,
  })
}

const useRemoveTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  name: 'wgaRemoveTeam',
  query: `
    mutation wgaRemoveTeam($id: String!) {
      team: wgaRemoveTeam(id: $id) {
        id
      }
    }
  `,
})
