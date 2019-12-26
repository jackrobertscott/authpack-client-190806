import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveWebhook: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveWebhook = useRemoveWebhook()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Webhook',
    children: element(ConfirmRemove, {
      helper: 'Remove this webhook',
      alert: 'Please confirm the removal of this webhook',
      loading: gqlRemoveWebhook.loading,
      change: () =>
        gqlRemoveWebhook.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveWebhook = createUseServer<{
  webhook: {
    id: string
  }
}>({
  query: `
    mutation RemoveWebhook($id: String!) {
      webhook: RemoveWebhook(id: $id) {
        id
      }
    }
  `,
})
