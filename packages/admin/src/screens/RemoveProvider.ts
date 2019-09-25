import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IRemoveProvider = {
  id: string
}

export const RemoveProvider: FC<IRemoveProvider> = ({ id }) => {
  // remove the provider when the form is submitted
  const removeProvider = useRemoveProvider()
  const remove = () => {
    removeProvider.fetch({ options: { id } })
  }
  return create(Gadgets.Container, {
    label: 'Remove Provider',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'radiation',
          label: 'Delete Provider',
          description: 'Permanently remove this provider',
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

const useRemoveProvider = createUseGraph<{
  provider: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation RemoveProvider($options: RemoveProviderOptions!) {
      provider: RemoveProvider(options: $options) {
        id
      }
    }
  `,
})
