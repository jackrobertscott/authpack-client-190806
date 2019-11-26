import { createElement as create, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowCredential: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetCredential = useGetCredential()
  useEffect(() => {
    gqlGetCredential.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const credential = gqlGetCredential.data
    ? gqlGetCredential.data.credential
    : undefined
  return create(Page, {
    title: 'Inspect',
    subtitle: 'Credential',
    children: !credential
      ? null
      : create(Layout, {
          column: true,
          children: [
            create(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: credential.id,
            }),
            create(Snippet, {
              key: 'disabled',
              icon: 'battery-three-quarters',
              label: 'Disabled',
              value: String(credential.disabled),
            }),
            create(Snippet, {
              key: 'user',
              icon: 'user',
              label: 'User',
              value: !credential.user ? '...' : credential.user.summary,
            }),
            create(Snippet, {
              key: 'team',
              icon: 'users',
              label: 'Team',
              value: !credential.team ? '...' : credential.team.summary,
            }),
            create(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                credential.created &&
                format(new Date(credential.created), 'dd LLL yyyy @ h:mm a'),
            }),
            create(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                credential.updated &&
                format(new Date(credential.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetCredential = createUseServer<{
  credential: {
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
    query GetCredential($id: String!) {
      credential: GetCredential(id: $id) {
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
