import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveStripePlan: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemovePlan = useRemovePlan()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Plan',
    children: element(ConfirmRemove, {
      helper: 'Remove this plan',
      alert: 'Please confirm the removal of this plan',
      loading: gqlRemovePlan.loading,
      change: () => gqlRemovePlan.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemovePlan = createUseServer<{
  plan: {
    id: string
  }
}>({
  query: `
    mutation RemoveStripePlanClient($id: String!) {
      plan: RemoveStripePlanClient(id: $id) {
        id
      }
    }
  `,
})
