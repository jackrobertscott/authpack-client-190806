import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
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
      payload: SettingsStore.state,
    })
    if (SettingsStore.state.session) currentSession.fetch()
    return SettingsStore.listen(data => {
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
            payload: SettingsStore.state,
          })
          break
        case 'wga:gadgets:set':
          SettingsStore.change(payload)
          break
        case 'wga:gadgets:open':
          SettingsStore.change(data => ({ ...data, open: true }))
          break
        case 'wga:gadgets:domain':
          SettingsStore.change(data => ({ ...data, domain: payload }))
          break
        case 'wga:gadgets:update':
          if (currentSession.data && currentSession.data.session)
            currentSession.fetch().then(({ session }: any) => {
              return SettingsStore.change(data => ({
                ...data,
                session,
                bearer: session ? `Bearer ${session.token}` : undefined,
              }))
            })
          break
        default:
          console.warn(`Unhandled settings radio event ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [])
}
