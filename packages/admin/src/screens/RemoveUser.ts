import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveUser = {
  id: string
}

export const RemoveUser: FC<IRemoveUser> = ({ id }) => {
  // remove the user when the form is submitted
  const removeUser = useRemoveUser()
  const remove = () => {
    removeUser.fetch({ options: { id } })
  }
  return create(Gadgets.Container, {
    label: 'Remove User',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Delete User',
          description: 'Permanently remove this user',
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

const useRemoveUser = createUseGraph<{
  user: {
    id: string
  }
}>({
  query: `
    mutation RemoveUser($options: RemoveUserOptions!) {
      user: RemoveUser(options: $options) {
        id
      }
    }
  `,
})
