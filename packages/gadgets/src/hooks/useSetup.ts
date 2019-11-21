import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useSettings } from './useSettings'
import { createUseServer } from './useServer'
import { config } from '../config'

export const useSetup = () => {
  const settings = useSettings()
  const gqlGetCurrentCluster = useGetCurrentCluster()
  const gqlGetCurrentSession = useGetCurrentSession()
  useEffect(() => {
    if (settings.domain) {
      gqlGetCurrentCluster.fetch().then(({ cluster }) => {
        SettingsStore.update({ cluster })
      })
    }
    // eslint-disable-next-line
  }, [settings.domain, settings.open])
  useEffect(() => {
    SettingsStore.update({
      ready: false,
      user: undefined,
      team: undefined,
      session: undefined,
      permissions: undefined,
    })
    if (settings.bearer && settings.domain) {
      gqlGetCurrentSession
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
    } else {
      SettingsStore.update({
        ready: true,
        bearer: undefined,
      })
    }
    // eslint-disable-next-line
  }, [settings.domain, settings.bearer])
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

const useGetCurrentCluster = createUseServer<{
  cluster: {
    id: string
    name: string
    theme: string
    power: boolean
    subscribed: boolean
    force_teams: boolean
  }
}>({
  query: `
    query wgaGetCurrentCluster {
      cluster: wgaGetCurrentCluster {
        id
        name
        theme
        power
        subscribed
        force_teams
      }
    }
  `,
})

const useGetCurrentSession = createUseServer<{
  session: {
    id: string
    token: string
    user: {
      id: string
      email: string
      username?: string
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
    query wgaGetCurrentSession {
      session: wgaGetCurrentSession {
        id
        token
        user {
          id
          email
          username
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
