import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Snippet } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListMemberships: FC<{
  update: (id: string) => void
  remove: (id: string) => void
}> = ({ update, remove }) => {
  const settings = useSettings()
  const gqlListMemberships = useListMemberships()
  useEffect(() => {
    gqlListMemberships.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Members',
    subtitle: settings.cluster && settings.cluster.name,
    loading: gqlListMemberships.loading,
    children: !gqlListMemberships.data
      ? null
      : gqlListMemberships.data.memberships.map(membership => {
          const suffix = membership.admin ? ' (admin)' : ''
          return create(Snippet, {
            key: membership.id,
            icon: 'user-circle',
            label: `${membership.user.summary}${suffix}`,
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
    user: {
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
