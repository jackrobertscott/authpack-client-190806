import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemovePermission: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemovePermission = useRemovePermission()
  return create(Page, {
    title: 'Remove',
    subtitle: 'Permission',
    children: create(ConfirmRemove, {
      helper: 'Remove this permission',
      alert: 'Please confirm the removal of this permission',
      change: () =>
        gqlRemovePermission.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemovePermission = createUseServer<{
  permission: {
    id: string
  }
}>({
  query: `
    mutation RemovePermission($id: String!) {
      permission: RemovePermission(id: $id) {
        id
      }
    }
  `,
})
