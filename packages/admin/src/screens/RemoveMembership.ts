import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveMembership: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveMembership = useRemoveMembership()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Membership',
    children: element(ConfirmRemove, {
      helper: 'Remove this membership',
      alert: 'Please confirm the removal of this membership',
      loading: gqlRemoveMembership.loading,
      change: () =>
        gqlRemoveMembership.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation RemoveMembership($id: String!) {
      membership: RemoveMembership(id: $id) {
        id
      }
    }
  `,
})
