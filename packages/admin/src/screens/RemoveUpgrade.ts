import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveUpgrade: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveUpgrade = useRemoveUpgrade()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Upgrade',
    children: element(ConfirmRemove, {
      helper: 'Remove this upgrade',
      alert: 'Please confirm the removal of this upgrade',
      loading: gqlRemoveUpgrade.loading,
      change: () =>
        gqlRemoveUpgrade.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveUpgrade = createUseServer<{
  upgrade: {
    id: string
  }
}>({
  query: `
    mutation RemoveUpgrade($id: String!) {
      upgrade: RemoveUpgrade(id: $id) {
        id
      }
    }
  `,
})
