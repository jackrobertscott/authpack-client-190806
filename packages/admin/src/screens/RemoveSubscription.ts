import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveSubscription: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveSubscription = useRemoveSubscription()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Subscription',
    children: element(ConfirmRemove, {
      helper: 'Remove this subscription',
      alert: 'Please confirm the removal of this subscription',
      loading: gqlRemoveSubscription.loading,
      change: () =>
        gqlRemoveSubscription.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveSubscription = createUseServer<{
  subscription: {
    id: string
  }
}>({
  query: `
    mutation RemoveSubscription($id: String!) {
      subscription: RemoveSubscription(id: $id) {
        id
      }
    }
  `,
})
