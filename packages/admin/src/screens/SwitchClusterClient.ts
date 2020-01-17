import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const SwitchClusterClient: FC<{
  change?: (id?: string) => void
  add: () => void
}> = ({ change, add }) => {
  const universal = useUniversal()
  const gqlListClusters = useListClusters()
  useEffect(() => {
    gqlListClusters.fetch()
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Switch',
    subtitle: 'Create a new Authpack cluster',
    corner: {
      icon: 'plus',
      label: 'New Cluster',
      click: add,
    },
    children: element(Layout, {
      column: true,
      children: [
        gqlListClusters.data &&
          gqlListClusters.data.clusters.map(({ id, name }) => {
            return element(Snippet, {
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
