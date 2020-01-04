import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  Page,
  InputStringArray,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { UniversalStore } from '../utils/universal'

export const CreateClusterClient: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateCluster = useCreateCluster()
  const schema = useSchema({
    schema: SchemaCreateCluster,
    submit: input => {
      gqlCreateCluster.fetch({ input }).then(({ cluster }) => {
        UniversalStore.recreate({ cluster_id: cluster.id })
        if (change) change(cluster.id)
      })
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'Cluster',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Control, {
          key: 'name',
          label: 'Name',
          error: schema.error('name'),
          children: element(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: '...',
          }),
        }),
        element(Control, {
          key: 'domains',
          label: 'Whitelisted Domains',
          helper: 'Domains allowed to make authorized requests',
          error: schema.error('domains'),
          children: element(InputStringArray, {
            value: schema.value('domains'),
            change: schema.change('domains'),
            placeholder: '...',
          }),
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateCluster.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateCluster = yup.object().shape({
  name: yup.string().required('Please provide the cluster name'),
  domains: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useCreateCluster = createUseServer<{
  cluster: {
    id: string
  }
}>({
  query: `
    mutation CreateClusterClient($input: CreateClusterInput!) {
      cluster: CreateClusterClient(input: $input) {
        id
      }
    }
  `,
})
