import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowMembership: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetMembership = useGetMembership()
  useEffect(() => {
    gqlGetMembership.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const membership = gqlGetMembership.data
    ? gqlGetMembership.data.membership
    : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Membership',
    children: !membership
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: membership.id,
            }),
            element(Snippet, {
              key: 'admin',
              icon: 'star',
              label: 'Admin',
              value: String(membership.admin),
            }),
            element(Snippet, {
              key: 'user',
              icon: 'user',
              label: 'User',
              value: !membership.user
                ? membership.user_email
                  ? `${membership.user_email} - pending`
                  : '...'
                : membership.user.summary,
            }),
            element(Snippet, {
              key: 'team',
              icon: 'users',
              label: 'Team',
              value: !membership.team ? '...' : membership.team.summary,
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                membership.created &&
                format(new Date(membership.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                membership.updated &&
                format(new Date(membership.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetMembership = createUseServer<{
  membership: {
    id: string
    created: string
    updated: string
    admin: boolean
    user_email?: string
    user?: {
      id: string
      summary: string
    }
    team?: {
      id: string
      summary: string
    }
  }
}>({
  query: `
    query GetMembership($id: String!) {
      membership: GetMembership(id: $id) {
        id
        created
        updated
        admin
        user_email
        user {
          id
          summary
        }
        team {
          id
          summary
        }
      }
    }
  `,
})
