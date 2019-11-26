import {
  createElement as create,
  FC,
  useEffect,
  Fragment,
  useState,
} from 'react'
import { Layout, Poster, Snippet, Page } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { useOauthCode } from '../hooks/useOauthCode'

export const ListProviders: FC<{
  change?: (id?: string) => void
}> = () => {
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlListProviders = useListProviders()
  const gqlListCredentials = useListCredentials()
  const gqlUpsertCredential = useUpsertCredential()
  const gqlRemoveCredential = useRemoveCredential()
  const [current, currentChange] = useState<string | undefined>()
  useEffect(() => {
    gqlListProviders.fetch()
    gqlListCredentials.fetch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (current && oauthCode.code) {
      gqlUpsertCredential
        .fetch({ input: { provider_id: current, code: oauthCode.code } })
        .then(() => gqlListCredentials.fetch())
        .finally(() => {
          currentChange(undefined)
          oauthCode.clearCode()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.code])
  return create(Page, {
    title: 'Apps',
    subtitle: settings.cluster && settings.cluster.name,
    children:
      !gqlListProviders.data || !gqlListCredentials.data
        ? null
        : !gqlListProviders.data.providers.length
        ? create(Poster, {
            icon: 'share-alt',
            label: '3rd Party Logins',
            helper: 'There are no authentication providers currently available',
          })
        : create(Fragment, {
            children: [
              create(Layout, {
                key: 'layout',
                column: true,
                children: gqlListProviders.data.providers.map(provider => {
                  const credential = gqlListCredentials.data!.credentials.find(
                    ({ provider_id }) => provider_id === provider.id
                  )
                  return create(Snippet, {
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
                            click: () => {
                              currentChange(provider.id)
                              oauthCode.openUrl(provider.url)
                            },
                          },
                        ]
                      : [
                          {
                            icon: 'redo-alt',
                            label: 'Refresh',
                            helper: `Update your ${provider.name} OAuth`,
                            click: () => {
                              currentChange(provider.id)
                              oauthCode.openUrl(provider.url)
                            },
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
