import { useEffect } from 'react'
import { settingsStore } from '../utils/settings'
import { radio } from '../utils/radio'

export const useSettings = () => {
  // send information to the window
  useEffect(() => {
    radio.message({
      name: 'wga:set',
      payload: settingsStore.state,
    })
    return settingsStore.listen(data => {
      radio.message({
        name: 'wga:set',
        payload: data,
      })
    })
  }, [])
  // handle information from the window
  useEffect(() => {
    return radio.listen(({ name, payload }) => {
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
      }
    })
  }, [])
}
