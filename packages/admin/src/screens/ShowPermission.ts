import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowPermission: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetPermission = useGetPermission()
  useEffect(() => {
    gqlGetPermission.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const permission = gqlGetPermission.data
    ? gqlGetPermission.data.permission
    : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Permission',
    children: !permission
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: permission.id,
            }),
            element(Snippet, {
              key: 'name',
              icon: 'users',
              label: 'Name',
              value: permission.name,
            }),
            element(Snippet, {
              key: 'tag',
              icon: 'tags',
              label: 'Tag',
              value: permission.tag,
            }),
            element(Snippet, {
              key: 'description',
              icon: 'book',
              label: 'Description',
              value: permission.description || '...',
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                permission.created &&
                format(new Date(permission.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                permission.updated &&
                format(new Date(permission.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetPermission = createUseServer<{
  permission: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query GetPermission($id: String!) {
      permission: GetPermission(id: $id) {
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
