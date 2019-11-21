import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const RemovePayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlRemovePayment = useRemovePayment()
  return create(Gadgets, {
    title: 'Terminate Payment',
    subtitle: universal.cluster_name,
    children: create(ConfirmRemove, {
      keyword: 'Terminate',
      helper: 'Remove payment card and disable cluster',
      alert: 'Consider powering off your cluster instead',
      change: () =>
        gqlRemovePayment
          .fetch({ id: universal.cluster_id })
          .then(({ cluster }) => {
            if (change) change(cluster.id)
            UniversalStore.update({
              power: cluster.power,
              subscribed: cluster.subscribed,
            })
          }),
    }),
  })
}

const useRemovePayment = createUseServer<{
  cluster: {
    id: string
    subscribed: boolean
    power: boolean
  }
}>({
  query: `
    mutation apiRemovePayment($id: String!) {
      cluster: apiRemovePayment(id: $id) {
        id
        subscribed
        power
      }
    }
  `,
})
