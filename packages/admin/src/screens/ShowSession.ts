import { createElement as element, FC, useEffect } from 'react'
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
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Session',
    children: !session
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: session.id,
            }),
            element(Snippet, {
              key: 'user',
              icon: 'user',
              label: 'User',
              value: !session.user ? '...' : session.user.summary,
            }),
            element(Snippet, {
              key: 'team',
              icon: 'users',
              label: 'Team',
              value: !session.team ? '...' : session.team.summary,
            }),
            element(Layout, {
              key: 'ended',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'disabled',
                  icon: 'battery-three-quarters',
                  label: 'Disabled',
                  value: String(session.disabled),
                }),
                element(Snippet, {
                  key: 'ended',
                  icon: 'clock',
                  label: 'Ended',
                  value: session.ended
                    ? format(new Date(session.ended), 'dd LLL yyyy @ h:mm a')
                    : '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'dates',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'created',
                  icon: 'clock',
                  label: 'Created',
                  value:
                    session.created &&
                    format(new Date(session.created), 'dd LLL yyyy @ h:mm a'),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    session.updated &&
                    format(new Date(session.updated), 'dd LLL yyyy @ h:mm a'),
                }),
              ],
            }),
          ],
        }),
  })
}

const useGetSession = createUseServer<{
  session: {
    id: string
    created: string
    updated: string
    ended: string
    disabled: boolean
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
        ended
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
