import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveGroup = {
  id: string
  change?: () => void
}

export const RemoveGroup: FC<IRemoveGroup> = ({ id, change }) => {
  // remove the group when the form is submitted
  const removeGroup = useRemoveGroup()
  const remove = () => {
    removeGroup
      .fetch({
        options: { id },
      })
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Remove Group',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Delete Group',
          description: 'Permanently remove this group',
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

const useRemoveGroup = createUseGraph<{
  group: {
    id: string
  }
}>({
  query: `
    mutation RemoveGroup($options: RemoveGroupOptions!) {
      group: RemoveGroup(options: $options) {
        id
      }
    }
  `,
})
