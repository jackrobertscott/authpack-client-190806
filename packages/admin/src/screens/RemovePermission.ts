import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveRole: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveRole = useRemoveRole()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Role',
    children: element(ConfirmRemove, {
      helper: 'Remove this role',
      alert: 'Please confirm the removal of this role',
      loading: gqlRemoveRole.loading,
      change: () => gqlRemoveRole.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveRole = createUseServer<{
  role: {
    id: string
  }
}>({
  query: `
    mutation RemoveRole($id: String!) {
      role: RemoveRole(id: $id) {
        id
      }
    }
  `,
})
