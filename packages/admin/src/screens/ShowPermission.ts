import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Snippet } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowPermission: FC<{
  id: string
}> = ({ id }) => {
  const universal = useUniversal()
  const gqlGetPermission = useGetPermission()
  useEffect(() => {
    gqlGetPermission.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const permission = gqlGetPermission.data
    ? gqlGetPermission.data.permission
    : ({} as any)
  return create(Gadgets, {
    title: 'Permission',
    subtitle: universal.app_name,
    children: create(Layout, {
      column: true,
      children: [
        create(Snippet, {
          key: 'id',
          icon: 'fingerprint',
          label: 'Id',
          value: permission.id,
        }),
        create(Snippet, {
          key: 'name',
          icon: 'users',
          label: 'Name',
          value: permission.name,
        }),
        create(Snippet, {
          key: 'tag',
          icon: 'tags',
          label: 'Tag',
          value: permission.tag,
        }),
        create(Snippet, {
          key: 'description',
          icon: 'book',
          label: 'Description',
          value: permission.tag,
        }),
        create(Snippet, {
          key: 'created',
          icon: 'clock',
          label: 'Created',
          value:
            permission.created &&
            format(new Date(permission.created), 'dd LLL yyyy @ h:mm a'),
        }),
        create(Snippet, {
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
    query apiGetPermission($id: String!) {
      permission: apiGetPermission(id: $id) {
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
