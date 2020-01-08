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
  const updateSession = () => {
    if (settings.bearer && settings.client) {
      gqlGetSession
        .fetch()
        .then(({ session: { user, team, membership, ...session } }) => {
          SettingsStore.update({
            ready: true,
            bearer: `Bearer ${session.token}`,
            session,
            user,
            team,
            membership,
          })
        })
        .catch(error => {
          const bearer =
            !error.code || error.code === 401
              ? undefined
              : SettingsStore.current.bearer
          SettingsStore.update({
            ready: true,
            bearer,
          })
        })
    } else {
      SettingsStore.update({
        ready: true,
        bearer: undefined,
      })
    }
  }
  useEffect(() => {
    if (settings.client) {
      gqlGetCluster
        .fetch()
        .then(({ cluster }) => SettingsStore.update({ cluster }))
        .then(() => updateSession())
    }
    // eslint-disable-next-line
  }, [settings.client, settings.open])
  useEffect(() => {
    SettingsStore.update({
      ready: false,
      session: undefined,
      user: undefined,
      team: undefined,
      membership: undefined,
    })
    updateSession()
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
        case 'plugin:options':
          SettingsStore.update({
            options: {
              ...SettingsStore.current.options,
              ...payload,
            },
          })
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
    stripe_publishable_key: string
    name: string
    theme_preference: string
    enable_team: boolean
    prompt_team: boolean
  }
}>({
  query: `
    query GetClusterCurrentClient {
      cluster: GetClusterCurrentClient {
        id
        stripe_publishable_key
        name
        theme_preference
        enable_team
        prompt_team
      }
    }
  `,
})

const useGetSession = createUseServer<{
  session: {
    id: string
    token: string
    membership?: {
      id: string
      admin: boolean
      superadmin: boolean
    }
    user?: {
      id: string
      email: string
      verified: boolean
      username: string
      name?: string
      name_given?: string
      name_family?: string
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
      subscription?: {
        id: string
        cancellation_requested: boolean
        cancelled: boolean
      }
    }
    team?: {
      id: string
      name: string
      tag: string
      description?: string
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
      subscription?: {
        id: string
        cancellation_requested: boolean
        cancelled: boolean
      }
    }
  }
}>({
  query: `
    query GetSessionClient {
      session: GetSessionClient {
        id
        token
        membership {
          id
          admin
          superadmin
        }
        user {
          id
          email
          verified
          username
          name
          name_given
          name_family
          plan {
            id
            name
            tag
            description
            statement
            amount
            currency
            interval
            interval_seperator
          }
          subscription {
            id
            cancellation_requested
            cancelled
          }
        }
        team {
          id
          name
          tag
          description
          plan {
            id
            name
            tag
            description
            statement
            amount
            currency
            interval
            interval_seperator
          }
          subscription {
            id
            cancellation_requested
            cancelled
          }
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
