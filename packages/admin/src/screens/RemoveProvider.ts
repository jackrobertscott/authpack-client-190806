import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveProvider: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveProvider = useRemoveProvider()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Provider',
    children: element(ConfirmRemove, {
      helper: 'Remove this provider',
      alert: 'Please confirm the removal of this provider',
      loading: gqlRemoveProvider.loading,
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
