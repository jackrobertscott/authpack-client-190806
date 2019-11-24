import { createElement as create, FC, useState } from 'react'
import { Focus, InputBoolean, Layout, Button } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const Power: FC<{
  close: () => void
}> = ({ close }) => {
  const universal = useUniversal()
  const gqlUpdateCluster = useUpdateCluster()
  const [power, powerChange] = useState(universal.power)
  return create(Layout, {
    grow: true,
    children: create(Focus, {
      icon: 'power-off',
      label: 'Power',
      helper: 'Disable or enable your gadgets',
      children: create(Layout, {
        divide: true,
        center: true,
        children: [
          create(InputBoolean, {
            key: 'toggle',
            value: power,
            change: value => powerChange(value),
          }),
          create(Button, {
            key: 'button',
            icon: 'angle-right',
            label: 'Save & Close',
            loading: gqlUpdateCluster.loading,
            click: () =>
              gqlUpdateCluster
                .fetch({ id: universal.cluster_id, input: { power } })
                .then(({ cluster }) => {
                  UniversalStore.update({ power: cluster.power })
                  close()
                }),
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
