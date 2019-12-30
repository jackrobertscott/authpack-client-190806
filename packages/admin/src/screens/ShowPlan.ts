import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowPlan: FC<{
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
            element(Layout, {
              key: 'name',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'users',
                  label: 'Name',
                  value: plan.name,
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'tags',
                  label: 'Tag',
                  value: plan.tag,
                }),
              ],
            }),
            element(Layout, {
              key: 'description',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'description',
                  icon: 'book',
                  label: 'Description',
                  value: plan.description || '...',
                }),
                element(Snippet, {
                  key: 'statement',
                  icon: 'credit-card',
                  label: 'Statement',
                  value: plan.statement || '...',
                }),
              ],
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
                  value: plan.amount / 100,
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
                  key: 'interval_separator',
                  icon: 'pause-circle',
                  label: 'Separator',
                  value: plan.interval_separator,
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
                    format(new Date(plan.created), 'dd LLL yyyy @ h:mm a'),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    plan.updated &&
                    format(new Date(plan.updated), 'dd LLL yyyy @ h:mm a'),
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
    created: string
    updated: string
    name: string
    tag: string
    description?: string
    statement?: string
    amount: number
    currency: string
    interval: string
    interval_separator: number
  }
}>({
  query: `
    query GetPlan($id: String!) {
      plan: GetPlan(id: $id) {
        id
        created
        updated
        name
        tag
        description
        statement
        amount
        currency
        interval
        interval_separator
      }
    }
  `,
})
