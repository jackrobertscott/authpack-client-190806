import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Snippet } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useGlobal } from '../hooks/useGlobal'

export const ShowSession: FC<{
  id: string
}> = ({ id }) => {
  const global = useGlobal()
  const gqlGetSession = useGetSession()
  useEffect(() => {
    gqlGetSession.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const session = gqlGetSession.data ? gqlGetSession.data.session : ({} as any)
  return create(Gadgets, {
    title: 'Inspect Session',
    subtitle: global.appname,
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
          value: session.disabled ? 'Yes' : 'No',
        }),
        create(Snippet, {
          key: 'user',
          icon: 'user',
          label: 'User',
          value: !session.user
            ? undefined
            : session.user.id
                .concat(' - ')
                .concat(
                  [session.user.name, session.user.username, session.user.email]
                    .filter(Boolean)
                    .join(', ')
                ),
        }),
        create(Snippet, {
          key: 'team',
          icon: 'users',
          label: 'Team',
          value: !session.team
            ? '...'
            : session.team.id
                .concat(' - ')
                .concat(
                  [session.team.name, session.team.tag]
                    .filter(Boolean)
                    .join(', ')
                ),
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
      name?: string
      username?: string
      email: string
    }
    team?: {
      id: string
      name: string
      tag: string
    }
  }
}>({
  query: `
    query apiGetSession($id: String!) {
      session: apiGetSession(id: $id) {
        id
        created
        updated
        disabled
        user {
          id
          name
          username
          email
        }
        team {
          id
          name
          tag
        }
      }
    }
  `,
})
