import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Poster, Snippet } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const SwitchTeam: FC<{ change?: () => void }> = ({ change }) => {
  const settings = useSettings()
  const gqlListTeams = useListTeams()
  const gqlSwitchTeam = useSwitchTeam()
  useEffect(() => {
    gqlListTeams.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Switch Team',
    subtitle: settings.app && settings.app.name,
    loading: gqlListTeams.loading || gqlSwitchTeam.loading,
    children: create(Layout, {
      column: true,
      children: [
        create(Poster, {
          key: 'poster',
          icon: 'users',
          label: 'Team',
          helper: 'Select a team to switch',
        }),
        gqlListTeams.data &&
          gqlListTeams.data.teams.map(({ id, name, description }) => {
            return create(Snippet, {
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
                  SettingsStore.update({ bearer: `Bearer ${session.token}` })
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
    query wgaListTeams {
      teams: wgaListTeams {
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
    mutation wgaSwitchTeam($id: String!) {
      session: wgaSwitchTeam(id: $id) {
        token
      }
    }
  `,
})
