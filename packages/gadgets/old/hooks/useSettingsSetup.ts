import { useEffect } from 'react'
import { settingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useCurrentSession } from '../hooks/useCurrentSession'

export const useSettingsSetup = () => {
  const currentSession = useCurrentSession()
  // send information to the window
  useEffect(() => {
    radio.message({
      name: 'wga:ready',
    })
    radio.message({
      name: 'wga:set',
      payload: settingsStore.state,
    })
    if (settingsStore.state.session) currentSession.fetch()
    return settingsStore.listen(data => {
      radio.message({
        name: 'wga:set',
        payload: data,
      })
    })
    // eslint-disable-next-line
  }, [])
  // handle information from the window
  useEffect(() => {
    return radio.listen(({ name, payload }) => {
      console.log(`Gadget received: ${name} - ${Date.now() % 86400000}`)
      switch (name) {
        case 'wga:request':
          radio.message({
            name: 'wga:set',
            payload: settingsStore.state,
          })
          break
        case 'wga:set':
          settingsStore.change(payload)
          break
        case 'wga:open':
          settingsStore.patch(data => ({ ...data, open: true }))
          break
        case 'wga:domain':
          settingsStore.patch(data => ({ ...data, domain: payload }))
          break
        case 'wga:update':
          if (currentSession.data && currentSession.data.session)
            currentSession.fetch().then(({ session }) => {
              return settingsStore.patch(data => ({ ...data, session }))
            })
          break
        default:
          console.warn(`Unhandled settings radio event ${name}`)
      }
    })
  }, [currentSession])
}
