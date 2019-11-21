import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { UniversalStore } from '../utils/universal'

export const useSetup = () => {
  const gadgets = useGadgets()
  const gqlGetApp = useGetApp()
  useEffect(() => {
    UniversalStore.reset()
    if (gadgets.bearer && gadgets.team && gadgets.team.id) {
      gqlGetApp.fetch().then(({ app }) => {
        UniversalStore.update({
          ready: true,
          app_id: app.id,
          app_name: app.name,
          app_domain_key: app.key_domain,
          subscribed: app.subscribed,
          power: app.power,
          theme: app.theme,
        })
      })
    } else {
      setTimeout(() => UniversalStore.update({ ready: true }))
    }
    // eslint-disable-next-line
  }, [gadgets.bearer, gadgets.team && gadgets.team.id])
}

const useGetApp = createUseServer<{
  app: {
    id: string
    name: string
    theme: string
    subscribed: boolean
    power: boolean
    key_domain: string
  }
}>({
  query: `
    query wgaGetApp($id: String) {
      app: wgaGetApp(id: $id) {
        id
        name
        theme
        subscribed
        power
        key_domain
      }
    }
  `,
})
