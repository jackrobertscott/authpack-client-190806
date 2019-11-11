import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { GlobalStore } from '../utils/global'
import { useGlobal } from './useGlobal'

export const useSetup = () => {
  const global = useGlobal()
  const gadgets = useGadgets()
  const gqlRetrieveApp = useRetrieveApp()
  const gqlCreateApp = useCreateApp()
  useEffect(() => {
    if (gadgets && gadgets.bearer && gadgets.team) {
      gqlRetrieveApp
        .fetch({ id: global.current_app_id })
        .then(({ app }) => {
          if (app) {
            GlobalStore.update({
              appname: app.name,
              subscribed: app.subscribed,
              power: app.power,
              current_domain_key: app.keys.domain,
            })
          } else if (!gqlCreateApp.loading) {
            gqlCreateApp.fetch({ name: 'App' }).then(data => {
              GlobalStore.update({
                current_app_id: data.app.id,
              })
            })
          }
        })
        .catch(() => GlobalStore.reset())
    } else {
      GlobalStore.reset()
    }
    // eslint-disable-next-line
  }, [gadgets.bearer, gadgets.user, gadgets.team])
}

const useRetrieveApp = createUseServer<{
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
    query wgaRetrieveApp($id: String) {
      app: wgaRetrieveApp(id: $id) {
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
