import faker from 'faker'
import {
  createElement as element,
  FC,
  useState,
  useEffect,
  useRef,
} from 'react'
import { Page, Table, Empty, Button, drip } from '@authpack/theme'
import { RouterManagerStripePlan } from './RouterManagerStripePlan'
import { createUseServer } from '../hooks/useServer'

export const ListStripePlans: FC<{ stripe_product_id: string }> = ({
  stripe_product_id,
}) => {
  const gqlListPlans = useListPlans()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const queryListPlans = useRef(drip(1000, gqlListPlans.fetch))
  useEffect(() => {
    queryListPlans.current({ stripe_product_id })
    // eslint-disable-next-line
  }, [stripe_product_id])
  const newPlan = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListPlans.data && gqlListPlans.data.stripe_plans.length
      ? gqlListPlans.data.stripe_plans
      : FakePlans
  return element(Page, {
    title: 'Plans',
    subtitle: 'Accept payment from your users',
    corner: {
      icon: 'plus',
      label: 'New Plan',
      click: newPlan,
    },
    children: [
      element(RouterManagerStripePlan, {
        key: 'router',
        id: idcurrent,
        visible: build,
        stripe_product_id,
        change: id => {
          queryListPlans.current({ stripe_product_id })
          if (id) {
            idcurrentChange(id)
          } else {
            buildChange(false)
            setTimeout(() => idcurrentChange(undefined), 200) // animation
          }
        },
        close: () => {
          buildChange(false)
          setTimeout(() => idcurrentChange(undefined), 200) // animation
        },
      }),
      gqlListPlans.data &&
        !gqlListPlans.data.stripe_plans.length &&
        element(Empty, {
          key: 'empty',
          icon: 'donate',
          label: 'Plans',
          helper: 'Would you like to create an plan?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Plan',
            click: newPlan,
          }),
        }),
      gqlListPlans.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'name', label: 'Name' },
            { key: 'interval', label: 'Interval' },
            { key: 'amount', label: 'Price' },
          ].map(({ label }) => ({
            label,
            icon: 'equals',
          })),
          rows: list.map(data => ({
            id: data.id,
            click: () => {
              idcurrentChange(data.id)
              buildChange(true)
            },
            cells: [
              { icon: 'fingerprint', value: data.name },
              {
                icon: 'dollar-sign',
                value:
                  `${(data.amount / 100).toFixed(2)} ${data.currency}` || '...',
              },
              {
                icon: 'clock',
                value: `${data.interval_count} ${data.interval}` || '...',
              },
            ],
          })),
        }),
    ],
  })
}

const useListPlans = createUseServer<{
  stripe_plans: Array<{
    id: string
    name?: string
    description?: string
    amount: number
    currency: string
    interval: string
    interval_count: number
  }>
}>({
  query: `
    query ListStripePlansClient($stripe_product_id: String!) {
      stripe_plans: ListStripePlansClient(stripe_product_id: $stripe_product_id) {
        id
        name
        description
        amount
        currency
        interval
        interval_count
      }
    }
  `,
})

const FakePlans: Array<{
  id: string
  name?: string
  description?: string
  amount: number
  currency: string
  interval: string
  interval_count: number
}> = Array.from(Array(3).keys()).map(() => ({
  id: faker.random.uuid(),
  name: faker.random.words(2),
  description: faker.random.words(5),
  amount: faker.random.number(100000),
  currency: 'usd',
  interval: Math.random() > 0.5 ? 'month' : 'year',
  interval_count: Math.random() > 0.5 ? 1 : 3,
}))
