import * as yup from 'yup'
import { createElement as element, FC, useEffect, useRef } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputSelect,
  drip,
  Page,
  InputBoolean,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreateSubscription: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateSubscription = useCreateSubscription()
  const gqlListUsers = useListUsers()
  const gqlListPlans = useListPlans()
  const gqlListCoupons = useListCoupons()
  const queryListUsers = useRef(drip(1000, gqlListUsers.fetch))
  const queryListPlans = useRef(drip(1000, gqlListPlans.fetch))
  const queryListCoupons = useRef(drip(1000, gqlListCoupons.fetch))
  const schema = useSchema({
    schema: SchemaCreateSubscription,
    submit: value => {
      gqlCreateSubscription
        .fetch({ value })
        .then(({ subscription }) => change && change(subscription.id))
    },
  })
  useEffect(() => {
    queryListUsers.current()
    queryListPlans.current()
    queryListCoupons.current()
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'New',
    subtitle: 'Subscription',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Control, {
          key: 'user_id',
          label: 'User',
          error: schema.error('user_id'),
          children: element(InputSelect, {
            value: schema.value('user_id'),
            change: schema.change('user_id'),
            placeholder: 'Select user...',
            filter: phrase => queryListUsers.current({ phrase }),
            options: !gqlListUsers.data
              ? []
              : gqlListUsers.data.users.map(user => ({
                  value: user.id,
                  label:
                    user.name && user.username
                      ? `${user.name} - ${user.username}`
                      : user.name || user.username,
                  helper: user.email,
                })),
          }),
        }),
        element(Control, {
          key: 'plan_id',
          label: 'Plan',
          error: schema.error('plan_id'),
          children: element(InputSelect, {
            value: schema.value('plan_id'),
            change: schema.change('plan_id'),
            placeholder: 'Select plan...',
            filter: phrase => queryListPlans.current({ phrase }),
            options: !gqlListPlans.data
              ? []
              : gqlListPlans.data.plans.map(plan => ({
                  value: plan.id,
                  label: `${plan.name} - ${plan.tag}`,
                  helper: plan.description,
                })),
          }),
        }),
        element(Layout, {
          key: 'coupon',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'coupon_id',
              label: 'Coupon',
              helper: 'Apply a discount',
              error: schema.error('coupon_id'),
              children: element(InputSelect, {
                value: schema.value('coupon_id'),
                change: schema.change('coupon_id'),
                placeholder: 'Select coupon...',
                filter: phrase => queryListCoupons.current({ phrase }),
                options: !gqlListCoupons.data
                  ? []
                  : gqlListCoupons.data.coupons.map(coupon => ({
                      value: coupon.id,
                      label: `${coupon.name} - ${coupon.tag}`,
                      helper: coupon.description,
                    })),
              }),
            }),
            element(Control, {
              key: 'cancellation_requested',
              label: 'Cancel',
              helper: 'Cancel after first payment is made',
              error: schema.error('cancellation_requested'),
              children: element(InputBoolean, {
                value: schema.value('cancellation_requested'),
                change: schema.change('cancellation_requested'),
              }),
            }),
          ],
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateSubscription.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateSubscription = yup.object().shape({
  user_id: yup.string().required('Please select a user'),
  plan_id: yup.string().required('Please select a plan'),
  coupon_id: yup.string(),
  cancellation_requested: yup.boolean(),
})

const useCreateSubscription = createUseServer<{
  subscription: {
    id: string
  }
}>({
  query: `
    mutation CreateSubscription($value: CreateSubscriptionValue!) {
      subscription: CreateSubscription(value: $value) {
        id
      }
    }
  `,
})

const useListUsers = createUseServer<{
  users: Array<{
    id: string
    name: string
    email: string
    username: string
  }>
}>({
  query: `
    query ListUsers($phrase: String) {
      users: ListUsers(phrase: $phrase, options: { limit: 5 }) {
        id
        name
        email
        username
      }
    }
  `,
})

const useListPlans = createUseServer<{
  plans: Array<{
    id: string
    name: string
    tag: string
    description: string
  }>
}>({
  query: `
    query ListPlans($phrase: String) {
      plans: ListPlans(phrase: $phrase, options: { limit: 5 }) {
        id
        name
        tag
        description
      }
    }
  `,
})

const useListCoupons = createUseServer<{
  coupons: Array<{
    id: string
    name: string
    tag: string
    description: string
  }>
}>({
  query: `
    query ListCoupons($phrase: String) {
      coupons: ListCoupons(phrase: $phrase, options: { limit: 5 }) {
        id
        name
        tag
        description
      }
    }
  `,
})
