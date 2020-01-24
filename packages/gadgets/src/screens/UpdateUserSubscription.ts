import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  useToaster,
  Page,
  InputSelect,
  Poster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'

export const UpdateUserSubscription: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlGetUser = useGetUser()
  const gqlListPlans = useListPlans()
  const gqlUpsertSubscription = useUpsertSubscription()
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      gqlUpsertSubscription
        .fetch({
          stripe_plan_id: value.plan_id,
          coupon: value.coupon,
        })
        .then(({ user }) => {
          if (change) change(user.id)
          SettingsStore.update({
            user: {
              ...SettingsStore.current.user!,
              updated: user.updated,
            },
          })
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
    if (settings.cluster) {
      gqlListPlans.fetch({
        stripe_product_id: settings.cluster.stripe_user_product_id,
      })
    }
    // eslint-disable-next-line
  }, [settings.cluster])
  useEffect(() => {
    if (gqlGetUser.data && gqlGetUser.data.user.stripe_plan)
      schema.set({
        ...schema.state,
        plan_id: gqlGetUser.data.user.stripe_plan.id,
      })
    // eslint-disable-next-line
  }, [gqlGetUser.data])
  return element(Page, {
    title: 'Plan',
    subtitle: settings.cluster && settings.cluster.name,
    children:
      !gqlGetUser.data || !gqlListPlans.data
        ? null
        : !gqlListPlans.data.plans.length
        ? element(Poster, {
            icon: 'bell',
            label: 'No Plans Available',
            helper: 'There are currently no payment plans available to select',
          })
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
                        label: plan.name || 'Unnamed',
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
    updated: string
  }
}>({
  query: `
    mutation UpsertUserStripeSubscriptionClient($stripe_plan_id: String!, $coupon: String) {
      user: UpsertUserStripeSubscriptionClient(stripe_plan_id: $stripe_plan_id, coupon: $coupon) {
        id
        updated
      }
    }
  `,
})

const useGetUser = createUseServer<{
  user: {
    name: string
    email: string
    updated: string
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
        updated
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
      plans: ListStripePlansClient(stripe_product_id: $stripe_product_id) {
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
