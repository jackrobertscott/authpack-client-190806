import {
  createElement as create,
  FC,
  useEffect,
  Fragment,
  useState,
} from 'react'
import { Gadgets, Layout, Poster, Button, useToaster } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC<{
  change?: (id?: string) => void
}> = () => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlListProviders = useListProviders()
  const gqlCreateCredential = useCreateCredential()
  const [current, currentChange] = useState<string | undefined>()
  const [tab, tabChange] = useState<Window | null | undefined>()
  useEffect(() => {
    gqlListProviders.fetch()
  }, [])
  useEffect(() => {
    if (current) {
      const interval = setInterval(() => {
        const data = localStorage.getItem('wga.code')
        if (!data) return
        if (tab) tab.close()
        if (interval) clearTimeout(interval)
        localStorage.removeItem('wga.code')
        const { code, created } = JSON.parse(data)
        const minuteAgo = Date.now() // - 1000 * 60
        if (!current) return
        if (created < minuteAgo)
          return toaster.add({
            icon: 'flag',
            label: 'Error',
            helper: 'OAuth code expired, please try again',
          })
        gqlCreateCredential
          .fetch({
            provider_id: current,
            code,
          })
          .then(console.log)
      }, 1000)
      return () => interval && clearTimeout(interval)
    }
  }, [current])
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
                  key: provider.id,
                  icon: 'handshake',
                  label: provider.preset,
                  click: () => {
                    currentChange(provider.id)
                    tabChange(window.open(provider.url))
                  },
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
