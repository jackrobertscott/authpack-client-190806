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

export const UpdateUserPayment: FC<{
  change?: (id?: string) => void
  cancel: () => void
}> = ({ change, cancel }) => {
  const toaster = useToaster()
  const mounted = useMounted()
  const settings = useSettings()
  const stripeCard = useRef<any>()
  const [stripe, stripeChange] = useState()
  const [loading, loadingChange] = useState<boolean>(false)
  const gqlUpsertPayment = useUpsertUserPayment()
  const gqlListPlans = useListPlans()
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
    gqlListPlans.fetch()
    if (settings.cluster && settings.cluster.stripe_publishable_key)
      stripeChange(createStripe(settings.cluster.stripe_publishable_key))
    if (settings.user)
      schema.set({ name: settings.user.name, email: settings.user.email })
    // eslint-disable-next-line
  }, [])
  const subscribed = settings.user && settings.user.subscribed
  return element(Page, {
    title: 'Payment',
    subtitle: 'Cluster',
    corner: !subscribed
      ? undefined
      : {
          icon: 'ban',
          label: 'Cancel Subscription',
          click: cancel,
        },
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
                    helper: `$${plan.amount / 100} ${plan.currency} every ${
                      plan.interval_separator
                    } ${plan.interval}${
                      plan.interval_separator === 1 ? '' : 's'
                    }`,
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
          element(Layout, {
            key: 'top',
            divide: true,
            children: [
              element(Control, {
                key: 'name',
                label: 'Name',
                helper: 'Found on card',
                error: schema.error('name'),
                children: element(InputString, {
                  value: schema.value('name'),
                  change: schema.change('name'),
                  placeholder: 'Fred Blogs',
                }),
              }),
              !subscribed &&
                element(Control, {
                  key: 'coupon',
                  label: 'Code',
                  helper: 'Optional payment code',
                  error: schema.error('coupon'),
                  children: element(InputString, {
                    value: schema.value('coupon'),
                    change: schema.change('coupon'),
                    placeholder: '...',
                  }),
                }),
            ],
          }),
          element(Control, {
            key: 'email',
            label: 'Billing Email',
            helper: 'This email will receive payment invoices',
            error: schema.error('email'),
            children: element(InputString, {
              value: schema.value('email'),
              change: schema.change('email'),
              placeholder: 'fred@example.com',
            }),
          }),
          element(Button, {
            key: 'submit',
            label: subscribed ? 'Update' : 'Submit',
            disabled: !schema.valid,
            click: schema.submit,
            loading,
          }),
        ],
      }),
    ],
  })
}

const SchemaUpdatePayment = yup.object().shape({
  plan_id: yup.string().required('Please select a plan'),
  name: yup.string().required('Please provide the name on the card'),
  coupon: yup.string(),
  email: yup
    .string()
    .email('Please use a valid email')
    .required('Please provide a billing email'),
})

const useUpsertUserPayment = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpsertUserPaymentClient($input: UpdateUserPaymentInput!) {
      user: UpsertUserPaymentClient(input: $input) {
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
