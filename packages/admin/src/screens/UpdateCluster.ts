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

export const UpdateCluster: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  const gqlUpdateCluster = useUpdateCluster()
  const schema = useSchema({
    schema: SchemaUpdateCluster,
    poller: input => {
      gqlUpdateCluster
        .fetch({ input, id: universal.cluster_id })
        .then(({ cluster }) => {
          if (change) change(cluster.id)
          UniversalStore.update({
            cluster_name: cluster.name,
            theme: cluster.theme,
          })
        })
    },
  })
  useEffect(() => {
    gqlGetCluster
      .fetch({ id: universal.cluster_id })
      .then(({ cluster }) => schema.set(cluster))
    // eslint-disable-next-line
  }, [universal.cluster_id])
  return create(Gadgets, {
    title: 'Update Cluster',
    subtitle: universal.cluster_name,
    loading: gqlUpdateCluster.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetCluster.data
        ? null
        : [
            create(Control, {
              key: 'name',
              label: 'Name',
              error: schema.error('name'),
              children: create(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'Cluster',
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

const SchemaUpdateCluster = yup.object().shape({
  name: yup.string().required('Please provide the cluster name'),
  theme: yup.string().required('Please select a theme'),
  domains: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useGetCluster = createUseServer<{
  cluster: {
    name: string
    theme: string
    domains: string[]
  }
}>({
  query: `
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        name
        theme
        domains
      }
    }
  `,
})

const useUpdateCluster = createUseServer<{
  cluster: {
    id: string
    name: string
    theme: string
  }
}>({
  query: `
    mutation UpdateClusterClient($id: String!, $input: UpdateClusterInput!) {
      cluster: UpdateClusterClient(id: $id, input: $input) {
        id
        name
        theme
      }
    }
  `,
})
