import { useEffect, useRef } from 'react'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from './useServer'
import { useSettings } from './useSettings'
import { useRadio } from './useRadio'

export const useSetup = () => {
  useRadio()
  const settings = useSettings()
  const gqlGetCluster = useGetCluster()
  const gqlGetSession = useGetSession()
  const bearerOld = useRef<string | undefined>()
  const updatedDates = useRef<{ user?: string; team?: string }>({})
  const clusterId = settings.cluster && settings.cluster.id
  const bearerkey = 'authpack.bearer'
  const bearermapGet = () => {
    let data
    const bearermap = localStorage.getItem(bearerkey) || JSON.stringify({})
    try {
      data = JSON.parse(bearermap)
    } catch {
      data = {}
    }
    return data
  }
  const endSession = () => {
    bearerOld.current = undefined
    const requredUpdate =
      !SettingsStore.current.ready || !!SettingsStore.current.bearer
    if (requredUpdate)
      SettingsStore.update({
        ready: true,
        bearer: undefined,
      })
  }
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
        .catch(() => endSession())
    } else endSession()
  }
  /**
   * Load the cluster associated to the client key.
   */
  useEffect(() => {
    if (settings.client) {
      gqlGetCluster
        .fetch({ domain: settings.domain })
        .then(({ cluster }) => {
          const data = bearermapGet()
          SettingsStore.update({
            cluster,
            bearer: data[cluster.id],
          })
        })
        .catch(() => endSession())
    }
    // eslint-disable-next-line
  }, [settings.client, settings.open])
  /**
   * Refresh the session when client or bearer changes.
   */
  useEffect(() => {
    if (settings.ready || settings.user)
      SettingsStore.update({
        ready: false,
        session: undefined,
        user: undefined,
        team: undefined,
        membership: undefined,
      })
    bearerOld.current = undefined
    if (clusterId) updateSession()
    // eslint-disable-next-line
  }, [clusterId, settings.bearer])
  /**
   * Listen to changes on the bearer.
   */
  useEffect(() => {
    if (clusterId) {
      const data = bearermapGet()
      data[clusterId] = settings.bearer ? settings.bearer : undefined
      localStorage.setItem(bearerkey, JSON.stringify(data))
    }
    // eslint-disable-next-line
  }, [clusterId, settings.bearer])
  /**
   * Listen to changes in updated values.
   */
  const userUpdatedDate = settings.user && settings.user.updated
  const teamUpdatedDate = settings.team && settings.team.updated
  useEffect(() => {
    const userShouldUpdate =
      settings.user &&
      updatedDates.current.user &&
      updatedDates.current.user !== settings.user.updated
    const teamShouldUpdate =
      settings.team &&
      updatedDates.current.team &&
      updatedDates.current.team !== settings.team.updated
    if (userShouldUpdate || teamShouldUpdate) {
      updateSession()
    }
    updatedDates.current = {
      user: settings.user ? settings.user.updated : undefined,
      team: settings.team ? settings.team.updated : undefined,
    }
    // eslint-disable-next-line
  }, [userUpdatedDate, teamUpdatedDate])
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    stripe_publishable_key: string
    stripe_user_product_id: string
    stripe_team_product_id: string
    name: string
    login_redirect_uri?: string
    logout_redirect_uri?: string
    theme_preference?: string
    enable_team: boolean
    prompt_team: boolean
    prompt_verify: boolean
    hide_signup: boolean
    hide_sidebar_payments: boolean
  }
}>({
  query: `
    query GetClusterCurrentClient($domain: String!) {
      cluster: GetClusterCurrentClient(domain: $domain) {
        id
        stripe_publishable_key
        stripe_user_product_id
        stripe_team_product_id
        name
        login_redirect_uri
        logout_redirect_uri
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
