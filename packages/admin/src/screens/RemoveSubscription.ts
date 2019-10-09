import { createElement as create, FC } from 'react'
import { Gadgets, Poster, Button } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveSubscription = {
  change?: () => void
}

export const RemoveSubscription: FC<IRemoveSubscription> = ({ change }) => {
  // remove the session when the form is submitted
  const removeSubscription = useRemoveSubscription()
  const remove = () => {
    removeSubscription.fetch().then(change)
  }
  return create(Gadgets.Container, {
    label: 'Remove Subscription',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Cancel Subscription',
          description: 'All gadgets will immediately stop working',
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

const useRemoveSubscription = createUseGraph<{
  workspace: {
    id: string
  }
}>({
  name: 'RemoveSubscription',
  query: `
    mutation RemoveSubscription {
      workspace: RemoveSubscription {
        id
      }
    }
  `,
})
