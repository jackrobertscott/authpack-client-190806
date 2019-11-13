import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Snippet } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useGlobal } from '../hooks/useGlobal'

export const ShowTeam: FC<{
  id: string
}> = ({ id }) => {
  const global = useGlobal()
  const gqlGetTeam = useGetTeam()
  useEffect(() => {
    gqlGetTeam.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const team = gqlGetTeam.data ? gqlGetTeam.data.team : ({} as any)
  return create(Gadgets, {
    title: 'Inspect Team',
    subtitle: global.appname,
    children: create(Layout, {
      column: true,
      children: [
        create(Snippet, {
          key: 'id',
          icon: 'fingerprint',
          label: 'Id',
          value: team.id,
        }),
        create(Snippet, {
          key: 'created',
          icon: 'clock',
          label: 'Created',
          value:
            team.created &&
            format(new Date(team.created), 'dd LLL yyyy @ h:mm a'),
        }),
        create(Snippet, {
          key: 'updated',
          icon: 'clock',
          label: 'Updated',
          value:
            team.updated &&
            format(new Date(team.updated), 'dd LLL yyyy @ h:mm a'),
        }),
      ],
    }),
  })
}

const useGetTeam = createUseServer<{
  team: {
    id: string
    created: string
    updated: string
  }
}>({
  query: `
    query apiGetTeam($id: String!) {
      team: apiGetTeam(id: $id) {
        id
        created
        updated
      }
    }
  `,
})
