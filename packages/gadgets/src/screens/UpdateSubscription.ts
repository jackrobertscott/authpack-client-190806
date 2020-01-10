import * as yup from 'yup'
import { createElement as element, FC, useEffect, useState } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  useToaster,
  Page,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useSettings } from '../hooks/useSettings'
import { COUNTRIES } from '../utils/countries'

export const UpdateSubscription: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlGetUser = useGetUser()
  const gqlListPlans = useListPlans()
  const gqlUpsertSubscription = useUpsertSubscription()
  const [filter, filterChange] = useState<string>('')
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      gqlUpsertSubscription
        .fetch({
          input: {
            plan_id: value.plan_id,
            coupon: value.coupon,
          },
        })
        .then(({ user }) => {
          if (change) change(user.id)
          gqlGetUser.fetch()
          toaster.add({
            icon: 'credit-card',
            label: 'Success',
            helper: 'Your current plan has been updated',
          })
        })
    },
  })
  useEffect(() => {
    gqlGetUser.fetch()
    gqlListPlans.fetch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (gqlGetUser.data && gqlGetUser.data.user.stripe_plan)
      schema.set({
        ...schema.state,
        plan_id: gqlGetUser.data.user.stripe_plan.id,
      })
    // eslint-disable-next-line
  }, [gqlGetUser.data])
  return element(Page, {
    title: 'Payment',
    subtitle: settings.cluster && settings.cluster.name,
    children: !gqlGetUser.data
      ? null
      : element(Layout, {
          key: 'layout',
          column: true,
          padding: true,
          divide: true,
          children: [
            element(Control, {
              key: 'plan_id',
              label: 'Plan',
              helper: 'Which subscription would you like?',
              error: schema.error('plan_id'),
              children: element(InputSelect, {
                value: schema.value('plan_id'),
                change: schema.change('plan_id'),
                options: !gqlListPlans.data
                  ? []
                  : gqlListPlans.data.plans.map(plan => ({
                      value: plan.id,
                      label: plan.name,
                      helper: `$${(plan.amount / 100).toFixed(2)} ${
                        plan.currency
                      } every ${plan.interval_count} ${plan.interval}${
                        plan.interval_count === 1 ? '' : 's'
                      }`,
                    })),
              }),
            }),
            element(Control, {
              key: 'coupon',
              label: 'Coupon',
              helper: 'Optional payment code',
              error: schema.error('coupon'),
              children: element(InputString, {
                value: schema.value('coupon'),
                change: schema.change('coupon'),
                placeholder: '...',
              }),
            }),
            element(Layout, {
              key: 'country',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'country',
                  label: 'Country',
                  error: schema.error('country'),
                  children: element(InputSelect, {
                    value: schema.value('country'),
                    change: schema.change('country'),
                    filter: writing => filterChange(writing),
                    options: COUNTRIES.filter(country =>
                      country.toLowerCase().includes(filter)
                    ).map(country => ({
                      value: country,
                      label: country,
                    })),
                  }),
                }),
                element(Control, {
                  key: 'zip_code',
                  label: 'Zip Code',
                  error: schema.error('zip_code'),
                  children: element(InputString, {
                    value: schema.value('zip_code'),
                    change: schema.change('zip_code'),
                    placeholder: '...',
                  }),
                }),
              ],
            }),
            element(Button, {
              key: 'submit',
              label: 'Update',
              loading: gqlUpsertSubscription.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
        }),
  })
}

const SchemaUpdatePayment = yup.object().shape({
  plan_id: yup.string().required('Please select a plan'),
  coupon: yup.string(),
})

const useUpsertSubscription = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpsertSubscriptionClient($input: UpsertSubscriptionInput!) {
      user: UpsertSubscriptionClient(input: $input) {
        id
      }
    }
  `,
})

const useGetUser = createUseServer<{
  user: {
    name: string
    email: string
    stripe_plan?: {
      id: string
      name?: string
      description?: string
      amount: number
      currency: string
      interval: string
      interval_count: number
    }
  }
}>({
  query: `
    query GetUserClient {
      user: GetUserClient {
        name
        email
        stripe_plan {
          id
          name
          description
          amount
          currency
          interval
          interval_count
        }
      }
    }
  `,
})

const useListPlans = createUseServer<{
  plans: Array<{
    id: string
    name: string
    tag: string
    description?: string
    amount: number
    currency: string
    interval: string
    interval_count: number
  }>
}>({
  query: `
    query ListPlansClient {
      plans: ListPlansClient {
        id
        name
        tag
        description
        amount
        currency
        interval
        interval_count
      }
    }
  `,
})
