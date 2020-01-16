import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page, Code } from '@authpack/theme'
import { useAuthpack } from '@authpack/react'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ShowClusterKeysClient: FC<{ back: () => void }> = ({ back }) => {
  const auth = useAuthpack()
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    gqlGetCluster.fetch({ id: universal.cluster_id })
    // eslint-disable-next-line
  }, [universal.cluster_id])
  const cluster = gqlGetCluster.data ? gqlGetCluster.data.cluster : undefined
  return element(Page, {
    title: 'API Keys',
    subtitle: 'Cluster',
    corner: {
      icon: 'undo-alt',
      label: 'Go Back',
      click: back,
    },
    children: !cluster
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'head',
              icon: 'code',
              label: 'Script',
              value:
                'Paste this code into the <head></head> tags of your website',
              children: element(Code, {
                value: `
<script
  src="https://scripts.v1.authpack.io/index.js"
  data-key="${cluster.key_client}">
</script>
                `.trim(),
              }),
            }),
            element(Snippet, {
              key: 'key_client',
              icon: 'key',
              label: 'Client Key',
              value: 'Your public key',
              children: element(Code, {
                value: cluster.key_client,
              }),
            }),
            element('div', {
              key: 'secret',
              id: 'key_hidden',
              children: element(Snippet, {
                icon: 'exclamation-circle',
                label: 'Secret Key',
                value:
                  auth.membership && auth.membership.admin
                    ? 'Keep this private - never use inside a web browser'
                    : 'Only team admin can see the secret key',
                children:
                  auth.membership &&
                  auth.membership.admin &&
                  element(Code, {
                    value: cluster.key_secret,
                  }),
              }),
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
