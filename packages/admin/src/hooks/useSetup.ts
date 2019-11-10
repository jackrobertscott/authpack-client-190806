import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { GlobalStore } from '../utils/global'

export const useSetup = () => {
  const gadgets = useGadgets()
  const apiRetrieveApp = useRetrieveApp()
  useEffect(() => {
    if (gadgets && gadgets.bearer && gadgets.team) {
      apiRetrieveApp.fetch().then(data => {
        GlobalStore.update({
          bearer_domain_key: data.keys.domain,
          subscribed: data.app.subscribed,
          appname: data.app.name,
        })
      })
    } else {
      GlobalStore.reset()
    }
    // eslint-disable-next-line
  }, [
    // eslint-disable-next-line
    gadgets && gadgets.bearer,
    // eslint-disable-next-line
    gadgets && gadgets.team && gadgets.team.id,
    // eslint-disable-next-line
    gadgets && gadgets.user && gadgets.user.id,
  ])
}

const useRetrieveApp = createUseServer<{
  app: {
    id: string
    name: string
    subscribed: boolean
  }
  keys: {
    domain: string
  }
}>({
  name: '_RetrieveApp_RetrieveAppKeys',
  query: `
    query _RetrieveApp_RetrieveAppKeys {
      app: _RetrieveApp {
        id
        name
        subscribed
      }
      keys: _RetrieveAppKeys {
        domain
      }
    }
  `,
})
