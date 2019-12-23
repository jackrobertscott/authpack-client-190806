import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowRole: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetRole = useGetRole()
  useEffect(() => {
    gqlGetRole.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const role = gqlGetRole.data ? gqlGetRole.data.role : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Role',
    children: !role
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: role.id,
            }),
            element(Snippet, {
              key: 'name',
              icon: 'users',
              label: 'Name',
              value: role.name,
            }),
            element(Snippet, {
              key: 'tag',
              icon: 'tags',
              label: 'Tag',
              value: role.tag,
            }),
            element(Snippet, {
              key: 'description',
              icon: 'book',
              label: 'Description',
              value: role.description || '...',
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                role.created &&
                format(new Date(role.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                role.updated &&
                format(new Date(role.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetRole = createUseServer<{
  role: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query GetRole($id: String!) {
      role: GetRole(id: $id) {
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
