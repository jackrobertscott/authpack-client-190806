import { createElement as element, FC, useEffect } from 'react'
import { Layout, Poster, Snippet, Page } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const SwitchTeam: FC<{
  change?: () => void
  add: () => void
}> = ({ change, add }) => {
  const settings = useSettings()
  const gqlListTeams = useListTeams()
  const gqlSwitchTeam = useSwitchTeam()
  useEffect(() => {
    gqlListTeams.fetch()
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Switch',
    subtitle: settings.cluster && settings.cluster.name,
    corner: {
      icon: 'plus',
      label: 'New Team',
      click: add,
    },
    children: element(Layout, {
      column: true,
      children: [
        element(Poster, {
          key: 'poster',
          icon: 'users',
          label: 'Team',
          helper: 'Select a team to switch',
        }),
        gqlListTeams.data &&
          gqlListTeams.data.teams.map(({ id, name, description }) => {
            return element(Snippet, {
              key: id,
              icon:
                settings.team && settings.team.id === id
                  ? 'dot-circle'
                  : 'circle',
              prefix: 'far',
              label: name,
              value: description,
              click: () =>
                gqlSwitchTeam.fetch({ id }).then(({ session }) => {
                  SettingsStore.update({
                    bearer: `Bearer ${session.token}`,
                  })
                  if (change) change()
                }),
            })
          }),
      ],
    }),
  })
}

const useListTeams = createUseServer<{
  teams: Array<{
    id: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListTeamsClient {
      teams: ListTeamsClient {
        id
        name
        tag
        description
      }
    }
  `,
})

const useSwitchTeam = createUseServer<{
  session: {
    token: string
  }
}>({
  query: `
    mutation SwitchTeamClient($id: String!) {
      session: SwitchTeamClient(id: $id) {
        token
      }
    }
  `,
})
