import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const RemovePayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlRemoveUser = useRemoveUser()
  return create(Gadgets, {
    title: 'Terminate Payment',
    subtitle: universal.app_name,
    children: create(ConfirmRemove, {
      keyword: 'Terminate',
      helper: 'Remove payment card and disable app',
      alert: 'Consider powering off your app instead',
      change: () =>
        gqlRemoveUser.fetch({ id: universal.app_id }).then(({ app }) => {
          if (change) change(app.id)
          UniversalStore.update({
            power: app.power,
            subscribed: app.subscribed,
          })
        }),
    }),
  })
}

const useRemoveUser = createUseServer<{
  app: {
    id: string
    subscribed: boolean
    power: boolean
  }
}>({
  query: `
    mutation apiRemovePayment($id: String!) {
      user: apiRemovePayment(id: $id) {
        id
        subscribed
        power
      }
    }
  `,
})
