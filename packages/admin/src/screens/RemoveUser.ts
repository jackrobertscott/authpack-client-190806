import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveUser = useRemoveUser()
  return element(Page, {
    title: 'Remove',
    subtitle: 'User',
    children: element(ConfirmRemove, {
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
