import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../../hooks/useGraph'

export type IRemoveSession = {
  id: string
}

export const RemoveSession: FC<IRemoveSession> = ({ id }) => {
  // remove the session when the form is submitted
  const removeSession = useRemoveSession()
  const remove = () => {
    removeSession.fetch({ options: { id } })
  }
  return create(Gadgets.Container, {
    label: 'Remove Session',
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Delete Session',
          description: 'Permanently remove this session',
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

const useRemoveSession = createUseGraph<{
  session: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation RemoveSession($options: RemoveSessionOptions!) {
      session: RemoveSession(options: $options) {
        id
      }
    }
  `,
})
