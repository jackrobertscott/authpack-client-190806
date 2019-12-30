import { createElement as element, FC, useState } from 'react'
import { Button, Poster, Layout, Focus, Page } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const RemoveUserPayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlRemoveUserPayment = useRemoveUserPayment()
  const [confirm, confirmChange] = useState<boolean>(false)
  return element(Page, {
    title: 'Danger',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      element(Poster, {
        key: 'poster',
        icon: 'trash-alt',
        label: 'Cancel',
        helper: 'Cancel your subscription',
      }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: element(Button, {
          key: 'submit',
          label: 'Cancel',
          click: () => confirmChange(true),
        }),
      }),
      element(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: 'Subscription will end after the current payment period',
        visible: confirm,
        children: element(Layout, {
          divide: true,
          media: true,
          children: [
            element(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              loading: gqlRemoveUserPayment.loading,
              click: () =>
                gqlRemoveUserPayment.fetch().then(() => {
                  if (change) change()
                }),
            }),
            element(Button, {
              key: 'cancel',
              minor: true,
              icon: 'times',
              label: 'Cancel',
              click: () => confirmChange(false),
            }),
          ],
        }),
      }),
    ],
  })
}

const useRemoveUserPayment = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation RemoveUserPaymentClient {
      user: RemoveUserPaymentClient {
        id
      }
    }
  `,
})
