import { createElement as create, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowTeam: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetTeam = useGetTeam()
  useEffect(() => {
    gqlGetTeam.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const team = gqlGetTeam.data ? gqlGetTeam.data.team : undefined
  return create(Page, {
    title: 'Inspect',
    subtitle: 'Team',
    children: !team
      ? null
      : create(Layout, {
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
    query GetTeam($id: String!) {
      team: GetTeam(id: $id) {
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
