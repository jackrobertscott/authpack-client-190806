import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveUser = useRemoveUser()
  return create(Page, {
    title: 'Remove',
    subtitle: 'User',
    children: create(ConfirmRemove, {
      helper: 'Remove this user',
      alert: 'Please confirm the removal of this user',
      loading: gqlRemoveUser.loading,
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
