import * as yup from 'yup'
import {
  createElement as element,
  FC,
  useState,
  useEffect,
  useRef,
} from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  useStripe,
  Button,
  InputStripe,
  useToaster,
  Page,
  useMounted,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useSettings } from '../hooks/useSettings'
import { createStripe } from '../utils/stripe'

export const CreateSubscription: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const mounted = useMounted()
  const settings = useSettings()
  const stripeCard = useRef<any>()
  const [stripe, stripeChange] = useState()
  const [loading, loadingChange] = useState<boolean>(false)
  const gqlGetUser = useGetUser()
  const gqlListPlans = useListPlans()
  const gqlUpsertPayment = useUpsertUserPayment()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      loadingChange(true)
      payment
        .tokenize(stripeCard.current)
        .then(token => {
          return gqlUpsertPayment
            .fetch({
              input: {
                token: token.id,
                plan_id: value.plan_id,
                name: value.name,
                coupon: value.coupon,
                email: value.email,
              },
            })
            .then(({ user }) => {
              if (change) change(user.id)
              gqlGetUser.fetch()
              toaster.add({
                icon: 'credit-card',
                label: 'Success',
                helper: 'Payment method was successfully accepted',
              })
            })
        })
        .catch(error => {
          if (!error.handled) {
            toaster.add({
              icon: 'credit-card',
              label: 'Card Error',
              helper:
                error.message || 'There was a problem processing the card',
            })
          }
        })
        .finally(() => loadingChange(false))
    },
  })
  useEffect(() => {
    gqlGetUser.fetch()
    gqlListPlans.fetch()
    if (settings.cluster && settings.cluster.stripe_publishable_key)
      stripeChange(createStripe(settings.cluster.stripe_publishable_key))
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    const unplanned = !schema.state.plan_id
    if (unplanned && gqlListPlans.data && settings.options.prompt_plan) {
      const plan = gqlListPlans.data.plans.find(({ tag }) => {
        return tag === settings.options.prompt_plan
      })
      if (plan) schema.set({ ...schema.state, plan_id: plan.id })
    }
    // eslint-disable-next-line
  }, [gqlListPlans.data, settings.options.prompt_plan])
  return element(Page, {
    title: 'Payment',
    subtitle: settings.cluster && settings.cluster.name,
    children: !gqlGetUser.data
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Layout, {
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
                          helper: `$${plan.amount / 100} ${
                            plan.currency
                          } billed every ${plan.interval_separator} ${
                            plan.interval
                          }${plan.interval_separator === 1 ? '' : 's'}`,
                        })),
                  }),
                }),
                element(Control, {
                  key: 'card',
                  label: 'Card',
                  helper: 'Powered by Stripe',
                  error: schema.error('card'),
                  children: element(InputStripe, {
                    stripe,
                    change: value => {
                      if (mounted.current) stripeCard.current = value
                    },
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
                  label: 'Subscribe',
                  disabled: !schema.valid,
                  click: schema.submit,
                  loading,
                }),
              ],
            }),
          ],
        }),
  })
}

const SchemaUpdatePayment = yup.object().shape({
  plan_id: yup.string().required('Please select a plan'),
  coupon: yup.string(),
})

const useUpsertUserPayment = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpsertUserPaymentClient($input: UpsertUserPaymentInput!) {
      user: UpsertUserPaymentClient(input: $input) {
        id
      }
    }
  `,
})

const useGetUser = createUseServer<{
  user: {
    name: string
    email: string
    plan_id: string
  }
}>({
  query: `
    query GetUserClient {
      user: GetUserClient {
        name
        email
        plan_id
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
    interval_separator: number
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
        interval_separator
      }
    }
  `,
})
