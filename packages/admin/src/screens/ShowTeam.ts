import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Snippet } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowTeam: FC<{
  id: string
}> = ({ id }) => {
  const universal = useUniversal()
  const gqlGetTeam = useGetTeam()
  useEffect(() => {
    gqlGetTeam.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const team = gqlGetTeam.data ? gqlGetTeam.data.team : ({} as any)
  return create(Gadgets, {
    title: 'Team',
    subtitle: universal.app_name,
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
          key: 'name',
          icon: 'users',
          label: 'Name',
          value: team.name,
        }),
        create(Snippet, {
          key: 'tag',
          icon: 'tags',
          label: 'Tag',
          value: team.tag,
        }),
        create(Snippet, {
          key: 'description',
          icon: 'book',
          label: 'Description',
          value: team.description || '...',
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
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query apiGetTeam($id: String!) {
      team: apiGetTeam(id: $id) {
        id
        created
        updated
        name
        tag
        description
      }
    }
  `,
})
