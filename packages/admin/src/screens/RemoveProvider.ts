import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'
import { useUniversal } from '../hooks/useUniversal'

export const RemoveProvider: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlRemoveProvider = useRemoveProvider()
  return create(Gadgets, {
    title: 'Remove Provider',
    subtitle: universal.cluster_name,
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
    mutation apiRemoveProvider($id: String!) {
      provider: apiRemoveProvider(id: $id) {
        id
      }
    }
  `,
})
