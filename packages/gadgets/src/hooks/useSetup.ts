import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useSettings } from './useSettings'
import { createUseServer } from './useServer'
import { config } from '../config'

export const useSetup = () => {
  const settings = useSettings()
  const gqlGetCluster = useGetCluster()
  const gqlGetSession = useGetSession()
  useEffect(() => {
    if (settings.client) {
      gqlGetCluster.fetch().then(({ cluster }) => {
        SettingsStore.update({ cluster })
      })
    }
    // eslint-disable-next-line
  }, [settings.client, settings.open])
  useEffect(() => {
    SettingsStore.update({
      ready: false,
      user: undefined,
      team: undefined,
      session: undefined,
      permissions: undefined,
    })
    if (settings.bearer && settings.client) {
      gqlGetSession
        .fetch()
        .then(({ session: { user, team, permissions, ...session } }) => {
          SettingsStore.update({
            ready: true,
            bearer: `Bearer ${session.token}`,
            user,
            team,
            session,
            permissions,
          })
        })
        .catch(() => {
          SettingsStore.update({
            ready: true,
            bearer: undefined,
          })
        })
    } else {
      SettingsStore.update({
        ready: true,
        bearer: undefined,
      })
    }
    // eslint-disable-next-line
  }, [settings.client, settings.bearer])
  useEffect(() => {
    radio.message({
      name: 'gadgets:loaded',
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

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    name: string
    theme: string
    power: boolean
    subscribed: boolean
  }
}>({
  query: `
    query GetClusterCurrentClient {
      cluster: GetClusterCurrentClient {
        id
        name
        theme
        power
        subscribed
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
      verified: boolean
      username: string
      name?: string
      name_given?: string
      name_family?: string
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
    query GetSessionClient {
      session: GetSessionClient {
        id
        token
        user {
          id
          email
          verified
          username
          name
          name_given
          name_family
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
