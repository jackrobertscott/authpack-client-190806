import { createElement as create, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowSession: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetSession = useGetSession()
  useEffect(() => {
    gqlGetSession.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const session = gqlGetSession.data ? gqlGetSession.data.session : undefined
  return create(Page, {
    title: 'Inspect',
    subtitle: 'Session',
    children: !session
      ? null
      : create(Layout, {
          column: true,
          children: [
            create(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: session.id,
            }),
            create(Snippet, {
              key: 'disabled',
              icon: 'battery-three-quarters',
              label: 'Disabled',
              value: String(session.disabled),
            }),
            create(Snippet, {
              key: 'user',
              icon: 'user',
              label: 'User',
              value: !session.user ? '...' : session.user.summary,
            }),
            create(Snippet, {
              key: 'team',
              icon: 'users',
              label: 'Team',
              value: !session.team ? '...' : session.team.summary,
            }),
            create(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                session.created &&
                format(new Date(session.created), 'dd LLL yyyy @ h:mm a'),
            }),
            create(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                session.updated &&
                format(new Date(session.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetSession = createUseServer<{
  session: {
    id: string
    disabled: boolean
    created: string
    updated: string
    user: {
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
    query GetSession($id: String!) {
      session: GetSession(id: $id) {
        id
        created
        updated
        disabled
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
