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
  const gqlLogoutUser = useLogoutUser()
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
      session: undefined,
      user: undefined,
      plan: undefined,
      team: undefined,
      membership: undefined,
    })
    if (settings.bearer && settings.client) {
      gqlGetSession
        .fetch()
        .then(({ session: { user, plan, team, membership, ...session } }) => {
          SettingsStore.update({
            ready: true,
            bearer: `Bearer ${session.token}`,
            session,
            user,
            plan,
            team,
            membership,
          })
        })
        .catch(error => {
          SettingsStore.update({
            ready: true,
            bearer:
              !error.code || error.code === 401
                ? undefined
                : SettingsStore.current.bearer,
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
      if ((data.bearer && data.user) || !data.bearer) {
        radio.message({
          name: 'gadgets:update',
          payload: data,
        })
      }
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    return radio.listen(({ name, payload = {} }) => {
      if (!name.startsWith('plugin:')) return
      if (config.debug) console.log(`${name} @ ${Date.now() % 86400000}`)
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
          if (settings.bearer)
            gqlLogoutUser
              .fetch()
              .finally(() => SettingsStore.update({ bearer: undefined }))
          break
        default:
          throw new Error(`Failed to process radio message: ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [settings.client, settings.bearer])
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    name: string
    theme_preference: string
    stripe_publishable_key: string
  }
}>({
  query: `
    query GetClusterCurrentClient {
      cluster: GetClusterCurrentClient {
        id
        name
        theme_preference
        stripe_publishable_key
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
    plan?: {
      id: string
      name: string
      tag: string
      description?: string
      statement?: string
      amount: number
      currency: string
      interval: string
      interval_seperator: number
    }
    team?: {
      id: string
      name: string
      tag: string
      description?: string
    }
    membership?: {
      id: string
      admin: boolean
      superadmin: boolean
    }
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
        plan {
          id
          name
          tag
          description
          statement
          amount
          currency
          interval
          interval_separator
        }
        team {
          id
          name
          tag
          description
        }
        membership {
          id
          admin
          superadmin
        }
      }
    }
  `,
})

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
