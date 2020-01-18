import { useEffect, useRef } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useSettings } from './useSettings'
import { createUseServer } from './useServer'
import { config } from '../config'

export const useRadio = () => {
  const settings = useSettings()
  const gqlLogoutUser = useLogoutUser()
  const connected = useRef<boolean>(false)
  const logout = useRef(() => gqlLogoutUser.fetch())
  /**
   * Send messages to gadgets.
   */
  useEffect(() => {
    radio.message({
      name: 'gadgets:loaded',
    })
    return SettingsStore.listen(data => {
      if (!connected.current) return
      const exists = data.bearer && data.user
      if (exists || !data.bearer) {
        radio.message({
          name: 'gadgets:update',
          payload: data,
        })
      }
    })
    // eslint-disable-next-line
  }, [])
  /**
   * Receive messages from gadgets.
   */
  useEffect(() => {
    return radio.listen(({ name, payload = {} }) => {
      if (!name.startsWith('plugin:')) return
      if (config.debug) console.log(`${name} @ ${Date.now() % 86400000}`)
      switch (name) {
        case 'plugin:current':
          connected.current = true
          SettingsStore.update({ ...payload })
          break
        case 'plugin:show':
          SettingsStore.update({ open: true })
          break
        case 'plugin:hide':
          SettingsStore.update({ open: false })
          break
        case 'plugin:options':
          SettingsStore.update({
            options: {
              ...SettingsStore.current.options,
              ...payload,
            },
          })
          break
        case 'plugin:exit':
          if (SettingsStore.current.bearer)
            logout.current().finally(() => {
              SettingsStore.update({ bearer: undefined })
              radio.message({ name: 'gadgets:unauth' })
            })
          break
        default:
          throw new Error(`Failed to process radio message: ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [])
  /**
   * Ensure the logout methods does not have stale auth keys.
   */
  useEffect(() => {
    logout.current = () => gqlLogoutUser.fetch()
    // eslint-disable-next-line
  }, [settings.client, settings.bearer])
}

const useLogoutUser = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation LogoutUserClient {
      session: LogoutUserClient {
        id
      }
    }
  `,
})
