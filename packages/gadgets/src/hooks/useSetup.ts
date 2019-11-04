import { useEffect } from 'react'
import { settings } from '../utils/settings'
import { radio } from '../utils/radio'
import { useCurrentSession } from './useCurrentSession'

export const useSetup = () => {
  const currentSession = useCurrentSession()
  useEffect(() => {
    radio.message({
      name: 'wga:plugin:ready',
    })
    radio.message({
      name: 'wga:plugin:set',
      payload: settings.state,
    })
    if (settings.state.session) currentSession.fetch()
    return settings.listen(data => {
      radio.message({
        name: 'wga:plugin:set',
        payload: data,
      })
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    return radio.listen(({ name, payload }) => {
      if (!name || !name.startsWith('wga:gadgets')) return
      console.log(`Gadget received: ${name} - ${Date.now() % 86400000}`)
      switch (name) {
        case 'wga:gadgets:request':
          radio.message({
            name: 'wga:plugin:set',
            payload: settings.state,
          })
          break
        case 'wga:gadgets:set':
          settings.change(payload)
          break
        case 'wga:gadgets:open':
          settings.change(data => ({ ...data, open: true }))
          break
        case 'wga:gadgets:domain':
          settings.change(data => ({ ...data, domain: payload }))
          break
        case 'wga:gadgets:update':
          if (currentSession.data && currentSession.data.session)
            currentSession.fetch().then(({ session }: any) => {
              return settings.change(data => ({ ...data, session }))
            })
          break
        default:
          console.warn(`Unhandled settings radio event ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [])
}
