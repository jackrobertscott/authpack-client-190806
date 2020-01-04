import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowSubscription: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetSubscription = useGetSubscription()
  useEffect(() => {
    gqlGetSubscription.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const subscription = gqlGetSubscription.data
    ? gqlGetSubscription.data.subscription
    : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Subscription',
    children: !subscription
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: subscription.id,
            }),
            element(Layout, {
              key: 'user',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'user',
                  label: 'User',
                  value: subscription.user ? subscription.user.summary : '...',
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'tags',
                  label: 'User Id',
                  value: subscription.user ? subscription.user.id : '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'plan',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'donate',
                  label: 'Plan',
                  value: subscription.plan ? subscription.plan.summary : '...',
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'tags',
                  label: 'Plan Id',
                  value: subscription.plan ? subscription.plan.id : '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'coupon',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'hand-holding-heart',
                  label: 'Coupon',
                  value: subscription.coupon
                    ? subscription.coupon.summary
                    : '...',
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'tags',
                  label: 'Coupon Id',
                  value: subscription.coupon ? subscription.coupon.id : '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'cancel',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'hourglass',
                  label: 'Ending',
                  value: String(subscription.cancellation_requested),
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'power-off',
                  label: 'Cancelled',
                  value: String(subscription.cancelled),
                }),
              ],
            }),
            element(Layout, {
              key: 'dates',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'created',
                  icon: 'clock',
                  label: 'Created',
                  value:
                    subscription.created &&
                    format(
                      new Date(subscription.created),
                      'dd LLL yyyy @ h:mm a'
                    ),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    subscription.updated &&
                    format(
                      new Date(subscription.updated),
                      'dd LLL yyyy @ h:mm a'
                    ),
                }),
              ],
            }),
          ],
        }),
  })
}

const useGetSubscription = createUseServer<{
  subscription: {
    id: string
    created: string
    updated: string
    cancelled: boolean
    cancellation_requested: boolean
    user: {
      id: string
      summary: string
    }
    plan: {
      id: string
      summary: string
    }
    coupon: {
      id: string
      summary: string
    }
  }
}>({
  query: `
    query GetSubscription($id: String!) {
      subscription: GetSubscription(id: $id) {
        id
        created
        updated
        cancelled
        cancellation_requested
        user {
          id
          summary
        }
        plan {
          id
          summary
        }
        coupon {
          id
          summary
        }
      }
    }
  `,
})
