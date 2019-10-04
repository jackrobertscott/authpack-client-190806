import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveWorkspace = {
  id: string
  change?: () => void
}

export const RemoveWorkspace: FC<IRemoveWorkspace> = ({ id, change }) => {
  // remove the workspace when the form is submitted
  const removeWorkspace = useRemoveWorkspace()
  const remove = () => {
    removeWorkspace
      .fetch({
        options: { id },
      })
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Remove Workspace',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Delete Workspace',
          description: 'Permanently remove this workspace',
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

const useRemoveWorkspace = createUseGraph<{
  workspace: {
    id: string
  }
}>({
  query: `
    mutation RemoveWorkspace($options: RemoveWorkspaceOptions!) {
      workspace: RemoveWorkspace(options: $options) {
        id
      }
    }
  `,
})
