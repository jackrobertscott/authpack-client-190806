import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { UniversalStore } from '../utils/universal'
import { useUniversal } from './useUniversal'

export const useSetup = () => {
  const universal = useUniversal()
  const gadgets = useGadgets()
  const gqlGetApp = useGetApp()
  const gqlCreateApp = useCreateApp()
  useEffect(() => {
    if (gadgets && gadgets.bearer && gadgets.team) {
      gqlGetApp
        .fetch({ id: universal.current_app_id })
        .then(({ app }) => {
          if (app) {
            UniversalStore.update({
              appname: app.name,
              subscribed: app.subscribed,
              power: app.power,
              current_app_id: app.id,
              current_domain_key: app.keys.domain,
            })
          } else if (!gqlCreateApp.loading) {
            gqlCreateApp.fetch({ name: 'App' }).then(data => {
              UniversalStore.update({
                current_app_id: data.app.id,
              })
            })
          }
        })
        .catch(() => UniversalStore.reset())
    } else {
      UniversalStore.reset()
    }
    // eslint-disable-next-line
  }, [gadgets.bearer, gadgets.user, gadgets.team])
}

const useGetApp = createUseServer<{
  app?: {
    id: string
    name: string
    subscribed: boolean
    power: boolean
    keys: {
      domain: string
    }
  }
}>({
  query: `
    query wgaGetApp($id: String) {
      app: wgaGetApp(id: $id) {
        id
        name
        subscribed
        power
        keys {
          domain
        }
      }
    }
  `,
})

const useCreateApp = createUseServer<{
  app: {
    id: string
  }
}>({
  query: `
    mutation wgaCreateApp($name: String!) {
      app: wgaCreateApp(name: $name) {
        id
      }
    }
  `,
})
