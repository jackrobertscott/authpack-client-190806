import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useSettings } from './useSettings'
import { createUseServer } from './useServer'
import { config } from '../config'

export const useSetup = () => {
  const settings = useSettings()
  const gqlCurrentApp = useCurrentApp()
  const gqlRetrieveSession = useRetrieveSession()
  useEffect(() => {
    if (settings.domain) {
      gqlCurrentApp.fetch().then(({ app }) => {
        SettingsStore.update({
          ready: true,
          appname: app.name || settings.appname,
          subscribed: !!app.subscribed,
          power: !!app.power,
        })
      })
    }
    // eslint-disable-next-line
  }, [settings.domain])
  useEffect(() => {
    if (settings.domain) {
      if (settings.bearer) {
        gqlRetrieveSession.fetch().then(({ session }) => {
          if (session) {
            const { user, team, permissions, ...data } = session
            SettingsStore.update({
              bearer: `Bearer ${session.token}`,
              session: data,
              user,
              team,
              permissions,
            })
          }
        })
      } else {
        SettingsStore.update({
          bearer: undefined,
          session: undefined,
          user: undefined,
          team: undefined,
          permissions: undefined,
        })
      }
    }
    // eslint-disable-next-line
  }, [settings.domain, settings.bearer])
  useEffect(() => {
    radio.message({
      name: 'gadgets:ready',
    })
    return SettingsStore.listen(data => {
      radio.message({
        name: 'gadgets:update',
        payload: data,
      })
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    return radio.listen(({ name, payload = {} }) => {
      if (!name.startsWith('plugin:')) return
      if (config.debug)
        console.log(`Gadget received: ${name} @ ${Date.now() % 86400000}`)
      switch (name) {
        case 'plugin:current':
          SettingsStore.update({ ...payload })
          break
        case 'plugin:show':
          SettingsStore.update({ open: true })
          break
        case 'plugin:hide':
          SettingsStore.update({ open: false })
          break
        case 'plugin:exit':
          SettingsStore.update({ bearer: undefined })
          break
        default:
          throw new Error(`Failed to process radio message: ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [])
}

const useCurrentApp = createUseServer<{
  app: {
    id: string
    name: string
    subscribed: boolean
    power: boolean
  }
}>({
  query: `
    query wgaCurrentApp {
      app: wgaCurrentApp {
        id
        name
        subscribed
        power
      }
    }
  `,
})

const useRetrieveSession = createUseServer<{
  session: {
    id: string
    token: string
    user: {
      id: string
      email: string
      username?: string
      given_name?: string
      family_name?: string
    }
    team?: {
      id: string
      name: string
      tag: string
      description?: string
    }
    permissions?: Array<{
      id: string
      name: string
      tag: string
      description?: string
    }>
  }
}>({
  query: `
    query wgaRetrieveSession {
      session: wgaRetrieveSession {
        id
        token
        user {
          id
          email
          username
          given_name
          family_name
        }
        team {
          id
          name
          tag
          description
        }
        permissions {
          id
          name
          tag
          description
        }
      }
    }
  `,
})
