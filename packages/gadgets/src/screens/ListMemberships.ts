import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Snippet } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListMemberships: FC = () => {
  const settings = useSettings()
  const gqlListMemberships = useListMemberships()
  useEffect(() => {
    gqlListMemberships.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Members',
    subtitle: settings.app && settings.app.name,
    loading: gqlListMemberships.loading,
    children: [
      gqlListMemberships.data &&
        gqlListMemberships.data.memberships.map(membership => {
          return create(Snippet, {
            key: membership.id,
            icon: 'user-circle',
            label: membership.user.summary.concat(
              membership.admin ? ' (admin)' : ''
            ),
            value: membership.permissions.map(({ name }) => name).join(', '),
          })
        }),
    ],
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
    query wgaListMemberships {
      memberships: wgaListMemberships {
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
