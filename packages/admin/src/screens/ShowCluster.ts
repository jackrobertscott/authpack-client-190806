import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowCluster: FC<{ keys: () => void }> = ({ keys }) => {
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    gqlGetCluster.fetch({ id: universal.cluster_id })
    // eslint-disable-next-line
  }, [universal.cluster_id])
  const cluster = gqlGetCluster.data ? gqlGetCluster.data.cluster : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Cluster',
    corner: {
      icon: 'key',
      label: 'Show Keys',
      click: keys,
    },
    children: !cluster
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: cluster.id,
            }),
            element(Layout, {
              key: 'name',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'tags',
                  label: 'Name',
                  value: cluster.name,
                }),
                element(Snippet, {
                  key: 'theme',
                  icon: 'magic',
                  label: 'Preferenced Theme',
                  value: cluster.theme_preference || 'default',
                }),
              ],
            }),
            element(Layout, {
              key: 'dates',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'created',
                  icon: 'clock',
                  label: 'Created',
                  value:
                    cluster.created &&
                    format(new Date(cluster.created), 'dd LLL yyyy @ h:mm a'),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    cluster.updated &&
                    format(new Date(cluster.updated), 'dd LLL yyyy @ h:mm a'),
                }),
              ],
            }),
          ],
        }),
  })
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    created: string
    updated: string
    name: string
    theme_preference: string
  }
}>({
  query: `
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        id
        created
        updated
        name
        theme_preference
      }
    }
  `,
})
