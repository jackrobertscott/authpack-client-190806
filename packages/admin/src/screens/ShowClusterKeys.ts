import { createElement as create, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowClusterKeys: FC<{ back: () => void }> = ({ back }) => {
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    gqlGetCluster.fetch({ id: universal.cluster_id })
    // eslint-disable-next-line
  }, [universal.cluster_id])
  const cluster = gqlGetCluster.data ? gqlGetCluster.data.cluster : undefined
  return create(Page, {
    title: 'Inspect',
    subtitle: 'Cluster',
    corner: {
      icon: 'undo-alt',
      label: 'Go Back',
      click: back,
    },
    children: !cluster
      ? null
      : create(Layout, {
          column: true,
          children: [
            create(Snippet, {
              key: 'key_client',
              icon: 'key',
              label: 'Client Key',
              value: cluster.key_client,
            }),
            create(Snippet, {
              key: 'name',
              icon: 'key',
              label: 'Secret Key - Private',
              value: cluster.key_secret,
            }),
          ],
        }),
  })
}

const useGetCluster = createUseServer<{
  cluster: {
    key_client: string
    key_secret: string
  }
}>({
  query: `
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        key_client
        key_secret
      }
    }
  `,
})
