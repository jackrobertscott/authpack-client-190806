import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveMembership = {
  id: string
}

export const RemoveMembership: FC<IRemoveMembership> = ({ id }) => {
  // remove the membership when the form is submitted
  const removeMembership = useRemoveMembership()
  const remove = () => {
    removeMembership.fetch({ options: { id } })
  }
  return create(Gadgets.Container, {
    label: 'Remove Membership',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Delete Membership',
          description: 'Permanently remove this membership',
        }),
        create(Button.Container, {
          key: 'remove',
          label: 'Delete',
          click: remove,
          confirm: true,
        }),
      ],
    }),
  })
}

const useRemoveMembership = createUseGraph<{
  membership: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation RemoveMembership($options: RemoveMembershipOptions!) {
      membership: RemoveMembership(options: $options) {
        id
      }
    }
  `,
})
