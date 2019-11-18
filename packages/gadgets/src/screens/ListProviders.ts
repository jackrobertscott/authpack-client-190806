import { createElement as create, FC, useEffect, Fragment } from 'react'
import { Gadgets, Layout, Poster, Button } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC<{
  change?: (id?: string) => void
}> = () => {
  const settings = useSettings()
  const gqlListProviders = useListProviders()
  const gqlCreateCredential = useCreateCredential()
  useEffect(() => {
    gqlListProviders.fetch()
  }, [])
  return create(Gadgets, {
    title: '3rd Party Logins',
    subtitle: settings.app && settings.app.name,
    children: !gqlListProviders.data
      ? null
      : !gqlListProviders.data.providers.length
      ? create(Poster, {
          icon: 'handshake',
          label: 'Providers',
          helper: 'There are no authentication providers currently available',
        })
      : create(Fragment, {
          children: [
            create(Layout, {
              key: 'layout',
              column: true,
              padding: true,
              divide: true,
              children: gqlListProviders.data.providers.map(provider => {
                return create(Button, {
                  icon: 'handshake',
                  label: provider.preset,
                  click: () => window.open(provider.url),
                })
              }),
            }),
          ],
        }),
  })
}

const useCreateCredential = createUseServer<{
  credential: {
    id: string
    access_token: string
    email?: string
  }
}>({
  query: `
    mutation wgaCreateCredential($provider_id: String!, $code: String!) {
      credential: wgaCreateCredential(provider_id: $provider_id, code: $code) {
        id
        access_token
        email
      }
    }
  `,
})

const useListProviders = createUseServer<{
  providers: Array<{
    id: string
    preset: string
    url: string
  }>
}>({
  query: `
    query wgaListProviders {
      providers: wgaListProviders {
        id
        preset
        url
      }
    }
  `,
})
