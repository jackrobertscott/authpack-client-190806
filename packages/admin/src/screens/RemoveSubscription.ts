import { createElement as create, FC } from 'react'
import { Gadgets, Poster, Button } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveSubscription = {
  id: string
  change?: () => void
}

export const RemoveSubscription: FC<IRemoveSubscription> = ({ id, change }) => {
  // remove the session when the form is submitted
  const removeSubscription = useRemoveSubscription()
  const remove = () => {
    removeSubscription
      .fetch({
        options: { id },
      })
      .then(change)
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
    subscribed: boolean
  }
}>({
  query: `
    mutation RemoveSubscription($options: RemoveSubscriptionOptions!) {
      workspace: RemoveSubscription(options: $options) {
        id
        subscribed
      }
    }
  `,
})
