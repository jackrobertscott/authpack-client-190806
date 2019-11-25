import { createElement as create, FC, useEffect } from 'react'
import { Snippet, Page } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListMemberships: FC<{
  add: () => void
  update: (id: string) => void
  remove: (id: string) => void
}> = ({ add, update, remove }) => {
  const settings = useSettings()
  const gqlListMemberships = useListMemberships()
  useEffect(() => {
    gqlListMemberships.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Page, {
    title: 'Members',
    subtitle: settings.cluster && settings.cluster.name,
    corner: {
      icon: 'plus',
      label: 'New Member',
      click: add,
    },
    children: !gqlListMemberships.data
      ? null
      : gqlListMemberships.data.memberships.map(membership => {
          const suffix = membership.admin ? ' (admin)' : ''
          return create(Snippet, {
            key: membership.id,
            icon: 'user-circle',
            label: membership.user
              ? `${membership.user.summary}${suffix}`
              : membership.user_email || 'User Unknown',
            value: membership.permissions.map(({ name }) => name).join(', '),
            options: [
              {
                icon: 'sliders-h',
                label: 'Update',
                helper: 'Change member permissions',
                click: () => update(membership.id),
              },
              {
                icon: 'trash-alt',
                label: 'Remove',
                helper: 'Delete member from team',
                click: () => remove(membership.id),
              },
            ],
          })
        }),
  })
}

const useListMemberships = createUseServer<{
  memberships: Array<{
    id: string
    admin: boolean
    user_email?: string
    user?: {
      summary: string
    }
    permissions: Array<{
      name: string
    }>
  }>
}>({
  query: `
    query ListMembershipsClient {
      memberships: ListMembershipsClient {
        id
        admin
        user_email
        user {
          summary
        }
        permissions {
          name
        }
      }
    }
  `,
})
