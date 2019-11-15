import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useSettings } from './useSettings'
import { createUseServer } from './useServer'
import { config } from '../config'

export const useSetup = () => {
  const settings = useSettings()
  const gqlCurrentApp = useCurrentApp()
  const gqlGetSession = useGetSession()
  useEffect(() => {
    if (settings.domain) {
      gqlCurrentApp.fetch().then(({ app }) => {
        SettingsStore.update({
          app,
          ready: true,
        })
      })
    }
    // eslint-disable-next-line
  }, [settings.domain])
  useEffect(() => {
    SettingsStore.update({
      user: undefined,
      team: undefined,
      session: undefined,
      permissions: undefined,
    })
    if (settings.bearer) {
      if (settings.domain) {
        gqlGetSession
          .fetch()
          .then(({ session: { user, team, permissions, ...session } }) => {
            SettingsStore.update({
              bearer: `Bearer ${session.token}`,
              user,
              team,
              session,
              permissions,
            })
          })
      } else {
        SettingsStore.update({
          bearer: undefined,
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
    power: boolean
    subscribed: boolean
    force_teams: boolean
  }
}>({
  query: `
    query wgaCurrentApp {
      app: wgaCurrentApp {
        id
        name
        power
        subscribed
        force_teams
      }
    }
  `,
})

const useGetSession = createUseServer<{
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
    query wgaGetSession {
      session: wgaGetSession {
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
