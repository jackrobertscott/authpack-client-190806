import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Layout, Snippet } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowApp: FC = () => {
  const universal = useUniversal()
  const gqlGetApp = useGetApp()
  useEffect(() => {
    gqlGetApp.fetch({ id: universal.app_id })
    // eslint-disable-next-line
  }, [])
  const app = gqlGetApp.data ? gqlGetApp.data.app : ({} as any)
  return create(Gadgets, {
    title: 'App',
    subtitle: universal.app_name,
    children: create(Layout, {
      column: true,
      children: [
        create(Snippet, {
          key: 'id',
          icon: 'fingerprint',
          label: 'Id',
          value: app.id,
        }),
        create(Snippet, {
          key: 'name',
          icon: 'tags',
          label: 'Name',
          value: app.name,
        }),
        create(Snippet, {
          key: 'power',
          icon: 'power-off',
          label: 'Power',
          value: app.power,
        }),
        create(Snippet, {
          key: 'subscribed',
          icon: 'bolt',
          label: 'Subscribed',
          value: app.subscribed,
        }),
        create(Snippet, {
          key: 'created',
          icon: 'clock',
          label: 'Created',
          value:
            app.created &&
            format(new Date(app.created), 'dd LLL yyyy @ h:mm a'),
        }),
        create(Snippet, {
          key: 'updated',
          icon: 'clock',
          label: 'Updated',
          value:
            app.updated &&
            format(new Date(app.updated), 'dd LLL yyyy @ h:mm a'),
        }),
      ],
    }),
  })
}

const useGetApp = createUseServer<{
  app: {
    id: string
    created: string
    updated: string
    name: string
    power: boolean
    subscribed: boolean
  }
}>({
  query: `
    query wgaGetApp($id: String!) {
      app: wgaGetApp(id: $id) {
        id
        created
        updated
        name
        power
        subscribed
      }
    }
  `,
})
