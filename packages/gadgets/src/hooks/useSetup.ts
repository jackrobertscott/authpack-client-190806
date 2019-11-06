import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useSettings } from './useSettings'
import { createUseServer } from './useServer'

export const useSetup = () => {
  const gqlRetrieveApp = useRetrieveApp()
  const gqlRefreshSession = useRefreshSession()
  const settings = useSettings()
  useEffect(() => {
    if (settings.state.domain)
      gqlRetrieveApp.fetch().then(({ app }) => {
        SettingsStore.change(data => ({
          ...data,
          appname: app.name || data.appname,
          subscribed: app.subscribed || false,
        }))
      })
    // eslint-disable-next-line
  }, [settings.state.domain])
  useEffect(() => {
    if (settings.state.domain && settings.state.bearer)
      gqlRefreshSession.fetch().then(({ session }) => {
        return SettingsStore.change(data => ({
          ...data,
          session,
          bearer: session ? `Bearer ${session.token}` : undefined,
        }))
      })
    // eslint-disable-next-line
  }, [settings.state.domain, settings.state.bearer])
  useEffect(() => {
    radio.message({
      name: 'wga:plugin:ready',
    })
    return SettingsStore.listen(data => {
      radio.message({
        name: 'wga:plugin:set',
        payload: data,
      })
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    return radio.listen(({ name, payload }) => {
      if (!name || !name.startsWith('wga:gadgets')) return
      console.log(`Gadget received: ${name} - ${Date.now() % 86400000}`)
      switch (name) {
        case 'wga:gadgets:request':
          radio.message({
            name: 'wga:plugin:set',
            payload: SettingsStore.state,
          })
          break
        case 'wga:gadgets:open':
          SettingsStore.change(data => ({ ...data, open: true }))
          break
        case 'wga:gadgets:domain':
          SettingsStore.change(data => ({
            ...data,
            domain: payload.domain,
            url: payload.url,
          }))
          break
        case 'wga:gadgets:update':
          if (gqlRefreshSession.data && gqlRefreshSession.data.session)
            gqlRefreshSession.fetch().then(({ session }: any) => {
              return SettingsStore.change(data => ({
                ...data,
                session,
                bearer: session ? `Bearer ${session.token}` : undefined,
              }))
            })
          break
        default:
          console.warn(`Unhandled settings radio event ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [])
}

const useRetrieveApp = createUseServer<{
  app: {
    id: string
    created: string
    updated: string
    name: string
    subscribed: boolean
  }
}>({
  name: 'RetrieveApp',
  query: `
    query RetrieveApp {
      app: RetrieveApp {
        id
        created
        updated
        name
        subscribed
      }
    }
  `,
})

const useRefreshSession = createUseServer<{
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
  name: 'RefreshSession',
  query: `
    mutation RefreshSession {
      session: RefreshSession {
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
