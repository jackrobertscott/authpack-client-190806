import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { UniversalStore } from '../utils/universal'
import { useUniversal } from './useUniversal'

export const useSetup = () => {
  const gadgets = useGadgets()
  const universal = useUniversal()
  const gqlGetApp = useGetApp()
  useEffect(() => {
    if (gadgets.bearer && gadgets.team && gadgets.team.id) {
      gqlGetApp
        .fetch()
        .then(({ app }) => {
          UniversalStore.update({
            app_id: app.id,
            app_name: app.name,
            app_domain_key: app.keys.domain,
            subscribed: app.subscribed,
            power: app.power,
          })
        })
        .catch(() => UniversalStore.reset())
    } else {
      UniversalStore.reset()
    }
    // eslint-disable-next-line
  }, [gadgets.bearer])
  useEffect(() => {
    if (universal.app_id) {
      gqlGetApp
        .fetch({ id: universal.app_id })
        .then(({ app }) => {
          UniversalStore.update({
            app_name: app.name,
            app_domain_key: app.keys.domain,
            subscribed: app.subscribed,
            power: app.power,
          })
        })
        .catch(() => UniversalStore.reset())
    }
    // eslint-disable-next-line
  }, [universal.app_id])
}

const useGetApp = createUseServer<{
  app: {
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
