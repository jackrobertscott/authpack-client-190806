import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'
import { useUniversal } from '../hooks/useUniversal'

export const RemoveUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlRemoveUser = useRemoveUser()
  return create(Gadgets, {
    title: 'Remove User',
    subtitle: universal.cluster_name,
    children: create(ConfirmRemove, {
      helper: 'Remove this user',
      alert: 'Please confirm the removal of this user',
      change: () => gqlRemoveUser.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation RemoveUser($id: String!) {
      user: RemoveUser(id: $id) {
        id
      }
    }
  `,
})
