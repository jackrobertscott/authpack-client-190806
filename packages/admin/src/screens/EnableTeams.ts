import { createElement as create, FC } from 'react'
import { Focus, Layout, Button, useToaster } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const EnableTeams: FC = () => {
  const toaster = useToaster()
  const universal = useUniversal()
  const gqlUpdateCluster = useUpdateCluster()
  return create(Layout, {
    grow: true,
    children: create(Focus, {
      icon: 'handshake',
      label: 'Teams',
      helper: 'Would you like to enable teams?',
      children: create(Button, {
        label: 'Enable',
        loading: gqlUpdateCluster.loading,
        click: () =>
          gqlUpdateCluster
            .fetch({
              id: universal.cluster_id,
              input: { teams_enabled: true },
            })
            .then(({ cluster }) => {
              UniversalStore.update({ teams_enabled: cluster.teams_enabled })
              if (cluster.teams_enabled)
                toaster.add({
                  label: 'Enabled Successfully',
                  helper: 'Turn teams off and on in settings',
                })
            }),
      }),
    }),
  })
}

const useUpdateCluster = createUseServer<{
  cluster: {
    teams_enabled: boolean
  }
}>({
  query: `
    mutation UpdateClusterClient($id: String!, $input: UpdateClusterInput!) {
      cluster: UpdateClusterClient(id: $id, input: $input) {
        teams_enabled
      }
    }
  `,
})
