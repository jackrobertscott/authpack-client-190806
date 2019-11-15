import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const SwitchTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Switch Team',
    subtitle: settings.app && settings.app.name,
    children: null,
  })
}

const useListTeams = createUseServer<{
  teams: Array<{
    id: string
    name: string
  }>
}>({
  query: `
    query wgaListTeams {
      teams: ListTeams {
        id
        name
      }
    }
  `,
})

const useSwitchTeam = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation wgaSwitchTeam($id: String!) {
      session: wgaSwitchTeam(id: $id) {
        id
      }
    }
  `,
})
