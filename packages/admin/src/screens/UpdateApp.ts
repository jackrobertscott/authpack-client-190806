import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  InputStringArray,
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
      gqlUpdateApp
        .fetch({ ...value, id: universal.current_app_id })
        .then(({ app }) => {
          if (change) change(app.id)
          UniversalStore.update({ appname: app.name })
        })
    },
  })
  useEffect(() => {
    gqlGetApp
      .fetch({ id: universal.current_app_id })
      .then(({ app }) => schema.set(app))
    // eslint-disable-next-line
  }, [universal.current_app_id])
  return create(Gadgets, {
    title: 'Update App',
    subtitle: universal.appname,
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
  domains: yup
    .array()
    .of(
      yup
        .string()
        .url('Please use a valid url')
        .required()
    )
    .default([]),
})

const useGetApp = createUseServer<{
  app: {
    name: string
    domains: string[]
  }
}>({
  query: `
    query wgaGetApp($id: String!) {
      app: wgaGetApp(id: $id) {
        name
        domains
      }
    }
  `,
})

const useUpdateApp = createUseServer<{
  app: {
    id: string
    name: string
  }
}>({
  query: `
    mutation wgaUpdateApp($id: String!, $name: String, $domains: [String!]) {
      app: wgaUpdateApp(id: $id, name: $name, domains: $domains) {
        id
        name
      }
    }
  `,
})
