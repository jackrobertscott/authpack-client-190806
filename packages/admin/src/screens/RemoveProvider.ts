import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveProvider: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveProvider = useRemoveProvider()
  return create(Page, {
    title: 'Remove',
    subtitle: 'Provider',
    children: create(ConfirmRemove, {
      helper: 'Remove this provider',
      alert: 'Please confirm the removal of this provider',
      change: () =>
        gqlRemoveProvider.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveProvider = createUseServer<{
  provider: {
    id: string
  }
}>({
  query: `
    mutation RemoveProvider($id: String!) {
      provider: RemoveProvider(id: $id) {
        id
      }
    }
  `,
})
