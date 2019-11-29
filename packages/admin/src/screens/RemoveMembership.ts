import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveMembership: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveMembership = useRemoveMembership()
  return create(Page, {
    title: 'Remove',
    subtitle: 'Membership',
    children: create(ConfirmRemove, {
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
