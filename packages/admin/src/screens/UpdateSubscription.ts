import * as yup from 'yup'
import { createElement as element, FC, useEffect, useRef } from 'react'
import {
  useSchema,
  Layout,
  Control,
  Page,
  Button,
  useToaster,
  drip,
  InputBoolean,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateSubscription: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlListPlans = useListPlans()
  const gqlListCoupons = useListCoupons()
  const gqlGetSubscription = useGetSubscription()
  const gqlUpdateSubscription = useUpdateSubscription()
  const queryListPlans = useRef(drip(1000, gqlListPlans.fetch))
  const queryListCoupons = useRef(drip(1000, gqlListCoupons.fetch))
  const schema = useSchema({
    schema: SchemaUpdateSubscription,
    submit: value => {
      gqlUpdateSubscription.fetch({ id, value }).then(({ subscription }) => {
        if (change) change(subscription.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetSubscription
      .fetch({ id })
      .then(({ subscription }) => schema.set(subscription))
    // eslint-disable-next-line
  }, [id])
  useEffect(() => {
    queryListPlans.current()
    queryListCoupons.current()
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Update',
    subtitle: 'Subscription',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetSubscription.data
        ? null
        : [
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
              label: 'Save',
              loading:
                gqlGetSubscription.loading || gqlUpdateSubscription.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateSubscription = yup.object().shape({
  plan_id: yup.string().required('Please select a plan'),
  coupon_id: yup.string(),
  cancellation_requested: yup.boolean(),
})

const useGetSubscription = createUseServer<{
  subscription: {
    plan_id: string
    coupon_id?: string
    cancellation_requested: boolean
  }
}>({
  query: `
    query GetSubscription($id: String!) {
      subscription: GetSubscription(id: $id) {
        plan_id
        coupon_id
        cancellation_requested
      }
    }
  `,
})

const useUpdateSubscription = createUseServer<{
  subscription: {
    id: string
  }
}>({
  query: `
    mutation UpdateSubscription($id: String!, $value: UpdateSubscriptionValue!) {
      subscription: UpdateSubscription(id: $id, value: $value) {
        id
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
