import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemovePermission: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemovePermission = useRemovePermission()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Permission',
    children: element(ConfirmRemove, {
      helper: 'Remove this permission',
      alert: 'Please confirm the removal of this permission',
      loading: gqlRemovePermission.loading,
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
