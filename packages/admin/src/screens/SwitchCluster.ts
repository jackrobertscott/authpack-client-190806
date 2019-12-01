import { createElement as create, FC, useEffect } from 'react'
import { Layout, Poster, Snippet, Page } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const SwitchCluster: FC<{
  change?: (id?: string) => void
  add: () => void
}> = ({ change, add }) => {
  const universal = useUniversal()
  const gqlListClusters = useListClusters()
  useEffect(() => {
    gqlListClusters.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Page, {
    title: 'Switch',
    subtitle: 'Cluster',
    corner: {
      icon: 'plus',
      label: 'New Cluster',
      click: add,
    },
    children: create(Layout, {
      column: true,
      children: [
        create(Poster, {
          key: 'poster',
          icon: 'users',
          label: 'Cluster',
          helper: 'Select a cluster to switch',
        }),
        gqlListClusters.data &&
          gqlListClusters.data.clusters.map(({ id, name }) => {
            return create(Snippet, {
              key: id,
              icon: universal.cluster_id === id ? 'dot-circle' : 'circle',
              prefix: 'far',
              label: name,
              click: () => {
                if (universal.cluster_id !== id)
                  UniversalStore.recreate({ cluster_id: id })
                if (change) change(id)
              },
            })
          }),
      ],
    }),
  })
}

const useListClusters = createUseServer<{
  clusters: Array<{
    id: string
    name: string
  }>
}>({
  query: `
    query ListClustersClient {
      clusters: ListClustersClient {
        id
        name
      }
    }
  `,
})
