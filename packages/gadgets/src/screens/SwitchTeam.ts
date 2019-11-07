import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const SwitchTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Switch Team',
    subtitle: settings.appname,
    children: null,
  })
}

const useListTeams = createUseServer<{
  teams: Array<{
    id: string
    name: string
  }>
}>({
  name: 'ListTeams',
  query: `
    query ListTeams {
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
  name: 'SwitchTeam',
  query: `
    mutation SwitchTeam($value: SwitchTeamValue!) {
      session: SwitchTeam(value: $value) {
        id
      }
    }
  `,
})
