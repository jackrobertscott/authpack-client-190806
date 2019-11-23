import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Snippet } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowSession: FC<{
  id: string
}> = ({ id }) => {
  const universal = useUniversal()
  const gqlGetSession = useGetSession()
  useEffect(() => {
    gqlGetSession.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const session = gqlGetSession.data ? gqlGetSession.data.session : ({} as any)
  return create(Gadgets, {
    title: 'Session',
    subtitle: universal.cluster_name,
    children: create(Layout, {
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
