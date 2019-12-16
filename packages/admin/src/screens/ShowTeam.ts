import { createElement as element, FC, useEffect } from 'react'
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
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Team',
    children: !team
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: team.id,
            }),
            element(Snippet, {
              key: 'name',
              icon: 'users',
              label: 'Name',
              value: team.name,
            }),
            element(Snippet, {
              key: 'tag',
              icon: 'tags',
              label: 'Tag',
              value: team.tag,
            }),
            element(Snippet, {
              key: 'description',
              icon: 'book',
              label: 'Description',
              value: team.description || '...',
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                team.created &&
                format(new Date(team.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
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
