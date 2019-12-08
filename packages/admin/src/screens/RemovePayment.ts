import { createElement as create, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const RemovePayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlRemovePayment = useRemovePayment()
  return create(Page, {
    title: 'Danger',
    subtitle: 'Stop payments & disable gadgets',
    children: create(ConfirmRemove, {
      keyword: 'Terminate',
      helper: 'Cancel subscription and invoice now',
      alert: 'User limits will be reapplied',
      loading: gqlRemovePayment.loading,
      change: () =>
        gqlRemovePayment
          .fetch({ id: universal.cluster_id })
          .then(({ cluster }) => {
            UniversalStore.update({ subscribed: cluster.subscribed })
            if (change) change(cluster.id)
          }),
    }),
  })
}

const useRemovePayment = createUseServer<{
  cluster: {
    id: string
    subscribed: boolean
  }
}>({
  query: `
    mutation RemovePaymentClient($id: String!) {
      cluster: RemovePaymentClient(id: $id) {
        id
        subscribed
      }
    }
  `,
})
