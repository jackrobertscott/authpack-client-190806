import { createElement as create, FC } from 'react'
import { Focus, InputBoolean, Layout, Button } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const Power: FC<{
  close: () => void
}> = ({ close }) => {
  const universal = useUniversal()
  const gqlUpdateCluster = useUpdateCluster()
  return create(Layout, {
    grow: true,
    children: create(Focus, {
      icon: 'power-off',
      label: 'Power',
      helper: 'Users will only be able to login to your gadgets while on',
      children: create(Layout, {
        divide: true,
        center: true,
        children: [
          create(InputBoolean, {
            key: 'toggle',
            value: universal.power,
            change: power => {
              gqlUpdateCluster
                .fetch({ id: universal.cluster_id, input: { power } })
                .then(({ cluster }) => {
                  UniversalStore.update({ power: cluster.power })
                })
            },
          }),
          create(Button, {
            key: 'button',
            icon: 'angle-right',
            label: 'Done',
            click: close,
          }),
        ],
      }),
    }),
  })
}

const useUpdateCluster = createUseServer<{
  cluster: {
    power: boolean
  }
}>({
  query: `
    mutation UpdateClusterClient($id: String!, $input: UpdateClusterInput!) {
      cluster: UpdateClusterClient(id: $id, input: $input) {
        power
      }
    }
  `,
})
