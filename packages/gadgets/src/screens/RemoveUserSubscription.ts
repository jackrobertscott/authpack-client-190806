import { createElement as element, FC, useState } from 'react'
import {
  Button,
  Poster,
  Layout,
  Focus,
  Page,
  useToaster,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const RemoveUserSubscription: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlRemoveUserSubscription = useRemoveUserSubscription()
  const [confirm, confirmChange] = useState<boolean>(false)
  return element(Page, {
    title: 'Remove',
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
              loading: gqlRemoveUserSubscription.loading,
              click: () =>
                gqlRemoveUserSubscription.fetch().then(() => {
                  if (change) change()
                  toaster.add({
                    label: 'Cancelled',
                    helper: 'Subscription will cancel at end of this period',
                  })
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

const useRemoveUserSubscription = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation CancelUserStripeSubscriptionClient {
      user: CancelUserStripeSubscriptionClient {
        id
      }
    }
  `,
})
