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
  }, [id])
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
              key: 'user',
              icon: 'user',
              label: 'User',
              value: !credential.user ? '...' : credential.user.summary,
            }),
            create(Snippet, {
              key: 'provider',
              icon: 'share-alt',
              label: 'Provider',
              value: !credential.provider ? '...' : credential.provider.name,
            }),
            create(Snippet, {
              key: 'scopes',
              icon: 'user-shield',
              label: 'Scopes',
              value:
                (credential.scopes && credential.scopes.join(', ')) || '...',
            }),
            create(Snippet, {
              key: 'tags',
              icon: 'at',
              label: 'Token',
              value: credential.access_token,
            }),
            create(Snippet, {
              key: 'id_external',
              icon: 'at',
              label: 'External Id',
              value: credential.id_external,
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
    created: string
    updated: string
    access_token: string
    id_external: string
    scopes: string[]
    user: {
      id: string
      summary: string
    }
    provider?: {
      id: string
      name: string
    }
  }
}>({
  query: `
    query GetCredential($id: String!) {
      credential: GetCredential(id: $id) {
        id
        created
        updated
        access_token
        id_external
        scopes
        provider {
          id
          name
        }
        user {
          id
          summary
        }
      }
    }
  `,
})
