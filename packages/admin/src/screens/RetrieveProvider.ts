import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../hooks/useGraph'

export type IRetrieveProvider = {
  id: string
  change?: () => void
}

export const RetrieveProvider: FC<IRetrieveProvider> = ({ id }) => {
  // load the provider to show on page
  const retrieveProviderGraph = useRetrieveProvider({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview Provider',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: retrieveProviderGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveProviderGraph.data.provider.id,
        }),
        create(Overview.Container, {
          key: 'Preset',
          label: 'Preset',
          icon: 'handshake',
          value: retrieveProviderGraph.data.provider.preset,
        }),
        create(Overview.Container, {
          key: 'Redirect Url',
          label: 'Redirect Url',
          icon: 'share-alt',
          value: retrieveProviderGraph.data.provider.redirect,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrieveProviderGraph.data.provider.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrieveProviderGraph.data.provider.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}

const useRetrieveProvider = createUseGraph<{
  provider: {
    id: string
    created: string
    updated: string
    preset: string
    redirect: string
  }
}>({
  query: `
    query RetrieveProvider($options: RetrieveProviderOptions!) {
      provider: RetrieveProvider(options: $options) {
        id
        updated
        created
        preset
        redirect
      }
    }
  `,
})
