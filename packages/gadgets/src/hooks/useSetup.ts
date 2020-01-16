import { useEffect, useRef } from 'react'
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
  const bearerOld = useRef<string | undefined>()
  const updateSession = () => {
    if (settings.bearer && settings.client) {
      gqlGetSession
        .fetch()
        .then(({ session: { user, team, membership, ...session } }) => {
          const bearer = `Bearer ${session.token}`
          const teamPrompt =
            settings.cluster && settings.cluster.prompt_team && !team
          const stayOpen =
            bearerOld.current || settings.options.prompt_plan || teamPrompt
          SettingsStore.update({
            ready: true,
            bearer,
            session,
            user,
            team,
            membership,
            open: stayOpen ? SettingsStore.current.open : false,
          })
          bearerOld.current = bearer
        })
        .catch(() => {
          SettingsStore.update({
            ready: true,
            bearer: undefined,
          })
          bearerOld.current = undefined
        })
    } else {
      SettingsStore.update({
        ready: true,
        bearer: undefined,
      })
      bearerOld.current = undefined
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
            gqlLogoutUser.fetch().finally(() => {
              bearerOld.current = undefined
              SettingsStore.update({ bearer: undefined })
            })
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
    stripe_user_product_id: string
    stripe_team_product_id: string
    name: string
    theme_preference: string
    enable_team: boolean
    prompt_team: boolean
    prompt_verify: boolean
    hide_signup: boolean
    hide_sidebar_payments: boolean
  }
}>({
  query: `
    query GetClusterCurrentClient {
      cluster: GetClusterCurrentClient {
        id
        stripe_publishable_key
        stripe_user_product_id
        stripe_team_product_id
        name
        theme_preference
        enable_team
        prompt_team
        prompt_verify
        hide_signup
        hide_sidebar_payments
      }
    }
  `,
})

const useGetSession = createUseServer<{
  session: {
    id: string
    created: string
    updated: string
    token: string
    membership?: {
      id: string
      created: string
      updated: string
      admin: boolean
      superadmin: boolean
    }
    user?: {
      id: string
      created: string
      updated: string
      email: string
      verified: boolean
      username: string
      name?: string
      name_given?: string
      name_family?: string
      teams_count: number
      sessions_count: number
      stripe_plan?: {
        id: string
        name?: string
        description?: string
        amount: number
        currency: string
        interval: string
        interval_count: number
      }
    }
    team?: {
      id: string
      created: string
      updated: string
      name: string
      tag: string
      description?: string
      users_count: number
      stripe_plan?: {
        id: string
        name?: string
        description?: string
        amount: number
        currency: string
        interval: string
        interval_count: number
      }
    }
  }
}>({
  query: `
    query GetSessionClient {
      session: GetSessionClient {
        id
        created
        updated
        token
        membership {
          id
          created
          updated
          admin
          superadmin
        }
        user {
          id
          created
          updated
          email
          verified
          username
          name
          name_given
          name_family
          teams_count
          sessions_count
          stripe_plan {
            id
            name
            description
            amount
            currency
            interval
            interval_count
          }
        }
        team {
          id
          created
          updated
          name
          tag
          description
          users_count
          stripe_plan {
            id
            name
            description
            amount
            currency
            interval
            interval_count
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
