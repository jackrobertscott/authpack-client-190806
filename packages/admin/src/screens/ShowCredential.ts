import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
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
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Credential',
    children: !credential
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: credential.id,
            }),
            element(Snippet, {
              key: 'user',
              icon: 'user',
              label: 'User',
              value: !credential.user ? '...' : credential.user.summary,
            }),
            element(Snippet, {
              key: 'provider',
              icon: 'share-alt',
              label: 'Provider',
              value: !credential.provider ? '...' : credential.provider.name,
            }),
            element(Snippet, {
              key: 'scopes',
              icon: 'user-shield',
              label: 'Scopes',
              value:
                (credential.scopes && credential.scopes.join(', ')) || '...',
            }),
            element(Snippet, {
              key: 'tags',
              icon: 'at',
              label: 'Token',
              value: credential.access_token,
            }),
            element(Snippet, {
              key: 'id_external',
              icon: 'at',
              label: 'External Id',
              value: credential.id_external,
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                credential.created &&
                format(new Date(credential.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
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
