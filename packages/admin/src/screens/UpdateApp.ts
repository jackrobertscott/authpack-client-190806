import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  InputStringArray,
  InputSelect,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'
import { UniversalStore } from '../utils/universal'

export const UpdateApp: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlGetApp = useGetApp()
  const gqlUpdateApp = useUpdateApp()
  const schema = useSchema({
    schema: SchemaUpdateApp,
    poller: value => {
      gqlUpdateApp.fetch({ ...value, id: universal.app_id }).then(({ app }) => {
        if (change) change(app.id)
        UniversalStore.update({
          app_name: app.name,
          theme: app.theme,
        })
      })
    },
  })
  useEffect(() => {
    gqlGetApp.fetch({ id: universal.app_id }).then(({ app }) => schema.set(app))
    // eslint-disable-next-line
  }, [universal.app_id])
  return create(Gadgets, {
    title: 'Update App',
    subtitle: universal.app_name,
    loading: gqlUpdateApp.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetApp.data
        ? null
        : [
            create(Control, {
              key: 'name',
              label: 'Name',
              error: schema.error('name'),
              children: create(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'App',
              }),
            }),
            create(Control, {
              key: 'theme',
              label: 'Theme',
              error: schema.error('theme'),
              children: create(InputSelect, {
                value: schema.value('theme'),
                change: schema.change('theme'),
                options: [
                  {
                    value: 'night_sky',
                    label: 'Night Sky',
                    helper: 'Dark theme',
                  },
                  {
                    value: 'snow_storm',
                    label: 'Snow Storm',
                    helper: 'Light theme',
                  },
                  {
                    value: 'blue_harvester',
                    label: 'Blue Harvester',
                    helper: 'Eye Friendly',
                  },
                ],
              }),
            }),
            create(Control, {
              key: 'domains',
              label: 'Whitelisted Domains',
              helper: 'Domains allowed to make authorized requests',
              error: schema.error('domains'),
              children: create(InputStringArray, {
                value: schema.value('domains'),
                change: schema.change('domains'),
                placeholder: '...',
              }),
            }),
          ],
    }),
  })
}

const SchemaUpdateApp = yup.object().shape({
  name: yup.string().required('Please provide the app name'),
  theme: yup.string().required('Please select a theme'),
  domains: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useGetApp = createUseServer<{
  app: {
    name: string
    theme: string
    domains: string[]
  }
}>({
  query: `
    query wgaGetApp($id: String!) {
      app: wgaGetApp(id: $id) {
        name
        theme
        domains
      }
    }
  `,
})

const useUpdateApp = createUseServer<{
  app: {
    id: string
    name: string
    theme: string
  }
}>({
  query: `
    mutation wgaUpdateApp($id: String!, $name: String, $theme: String, $domains: [String!]) {
      app: wgaUpdateApp(id: $id, name: $name, theme: $theme, domains: $domains) {
        id
        name
        theme
      }
    }
  `,
})
