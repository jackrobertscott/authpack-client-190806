import { createElement as element, FC, useEffect, Fragment } from 'react'
import { Layout, Poster, Snippet, Page, useOauthCode } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC<{
  change?: (id?: string) => void
}> = () => {
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlListProviders = useListProviders()
  const gqlListCredentials = useListCredentials()
  const gqlUpsertCredential = useUpsertCredential()
  const gqlRemoveCredential = useRemoveCredential()
  useEffect(() => {
    gqlListProviders.fetch()
    gqlListCredentials.fetch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (oauthCode.current && oauthCode.code) {
      gqlUpsertCredential
        .fetch({
          input: {
            provider_id: oauthCode.current,
            code: oauthCode.code,
          },
        })
        .then(() => gqlListCredentials.fetch())
        .finally(() => oauthCode.clear())
    }
    // eslint-disable-next-line
  }, [oauthCode.current, oauthCode.code])
  return element(Page, {
    title: 'Apps',
    subtitle: settings.cluster && settings.cluster.name,
    children:
      !gqlListProviders.data || !gqlListCredentials.data
        ? null
        : !gqlListProviders.data.providers.length
        ? element(Poster, {
            icon: 'share-alt',
            label: '3rd Party Logins',
            helper: 'There are no authentication providers currently available',
          })
        : element(Fragment, {
            children: [
              element(Layout, {
                key: 'layout',
                column: true,
                children: gqlListProviders.data.providers.map(provider => {
                  const credential = gqlListCredentials.data!.credentials.find(
                    ({ provider_id }) => provider_id === provider.id
                  )
                  return element(Snippet, {
                    key: provider.id,
                    icon: provider.preset,
                    label: provider.name || provider.preset,
                    prefix: 'fab',
                    value: !credential ? 'Not connected' : 'Connected',
                    options: !credential
                      ? [
                          {
                            icon: 'plus',
                            label: 'Connect',
                            helper: `Add ${provider.name} OAuth`,
                            click: () =>
                              oauthCode.open(provider.id, provider.url),
                          },
                        ]
                      : [
                          {
                            icon: 'redo-alt',
                            label: 'Refresh',
                            helper: `Update your ${provider.name} OAuth`,
                            click: () =>
                              oauthCode.open(provider.id, provider.url),
                          },
                          {
                            icon: 'trash-alt',
                            label: 'Remove',
                            helper: 'Delete this OAuth provider',
                            click: () => {
                              gqlRemoveCredential
                                .fetch({ id: credential.id })
                                .finally(() => gqlListCredentials.fetch())
                            },
                          },
                        ],
                  })
                }),
              }),
            ],
          }),
  })
}

const useListProviders = createUseServer<{
  providers: Array<{
    id: string
    preset: string
    name?: string
    url: string
  }>
}>({
  query: `
    query ListProvidersClient {
      providers: ListProvidersClient {
        id
        preset
        name
        url
      }
    }
  `,
})

const useListCredentials = createUseServer<{
  credentials: Array<{
    id: string
    provider_id: string
  }>
}>({
  query: `
    query ListCredentialsClient {
      credentials: ListCredentialsClient {
        id
        provider_id
      }
    }
  `,
})

const useUpsertCredential = createUseServer<{
  credential: {
    id: string
  }
}>({
  query: `
    mutation UpsertCredentialClient($input: UpsertCredentialInput!) {
      credential: UpsertCredentialClient(input: $input) {
        id
      }
    }
  `,
})

const useRemoveCredential = createUseServer<{
  credential: {
    id: string
  }
}>({
  query: `
    mutation RemoveCredentialClient($id: String!) {
      credential: RemoveCredentialClient(id: $id) {
        id
      }
    }
  `,
})
