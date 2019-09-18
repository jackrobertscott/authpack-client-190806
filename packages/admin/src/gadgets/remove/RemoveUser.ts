import { createElement as create, FC } from 'react'
import { Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../../hooks/useGraph'

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
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: [
        create(Button.Container, {
          key: 'remove',
          label: 'Remove',
          click: remove,
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
  api: true,
  query: `
    mutation RemoveUser($options: RemoveUserOptions!) {
      user: RemoveUser(options: $options) {
        id
      }
    }
  `,
})
