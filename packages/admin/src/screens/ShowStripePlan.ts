import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowStripePlan: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetPlan = useGetPlan()
  useEffect(() => {
    gqlGetPlan.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const plan = gqlGetPlan.data ? gqlGetPlan.data.plan : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Plan',
    children: !plan
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: plan.id,
            }),
            element(Snippet, {
              key: 'name',
              icon: 'users',
              label: 'Name',
              value: plan.name,
            }),
            element(Snippet, {
              key: 'description',
              icon: 'book',
              label: 'Description',
              value: plan.description || '...',
            }),
            element(Layout, {
              key: 'amount',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'amount',
                  icon: 'dollar-sign',
                  label: 'Amount',
                  value: (plan.amount / 100).toFixed(2),
                }),
                element(Snippet, {
                  key: 'currency',
                  icon: 'coins',
                  label: 'Currency',
                  value: plan.currency,
                }),
              ],
            }),
            element(Layout, {
              key: 'interval',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'interval',
                  icon: 'calendar',
                  label: 'Interval',
                  value: plan.interval,
                }),
                element(Snippet, {
                  key: 'interval_count',
                  icon: 'pause-circle',
                  label: 'Separator',
                  value: plan.interval_count,
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
                    plan.created &&
                    format(
                      new Date(plan.created * 1000),
                      'dd LLL yyyy @ h:mm a'
                    ),
                }),
              ],
            }),
          ],
        }),
  })
}

const useGetPlan = createUseServer<{
  plan: {
    id: string
    name?: string
    description?: string
    amount: number
    currency: string
    interval: string
    interval_count: number
    created: number
  }
}>({
  query: `
    query GetStripePlanClient($id: String!) {
      plan: GetStripePlanClient(stripe_plan_id: $id) {
        id
        name
        description
        amount
        currency
        interval
        interval_count
        created
      }
    }
  `,
})
