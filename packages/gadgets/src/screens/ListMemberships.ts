import { createElement as element, FC, useEffect } from 'react'
import { Snippet, Page } from '@authpack/theme'
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
  return element(Page, {
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
          return element(Snippet, {
            key: membership.id,
            icon: 'user-circle',
            label: membership.user
              ? membership.user.summary
              : membership.user_email || 'User unknown',
            value: membership.admin ? 'Admin' : 'Member',
            options:
              settings.membership && settings.membership.admin
                ? [
                    {
                      icon: 'sliders-h',
                      label: 'Update',
                      helper: 'Update member',
                      click: () => update(membership.id),
                    },
                    {
                      icon: 'trash-alt',
                      label: 'Remove',
                      helper: 'Delete member from team',
                      click: () => remove(membership.id),
                    },
                  ]
                : undefined,
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
      }
    }
  `,
})
