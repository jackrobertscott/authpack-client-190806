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
  Snippet,
  Markdown,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useSettings } from '../hooks/useSettings'
import { createStripe } from '../utils/stripe'

export const UpdateUserPayment: FC<{
  change?: (id?: string) => void
  cancel: () => void
  update: () => void
}> = ({ change, cancel, update }) => {
  const toaster = useToaster()
  const mounted = useMounted()
  const settings = useSettings()
  const stripeCard = useRef<any>()
  const [stripe, stripeChange] = useState()
  const [loading, loadingChange] = useState<boolean>(false)
  const gqlGetUser = useGetUser()
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
                name: value.name,
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
    if (settings.cluster && settings.cluster.stripe_publishable_key)
      stripeChange(createStripe(settings.cluster.stripe_publishable_key))
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (gqlGetUser.data) {
      const user = gqlGetUser.data.user
      schema.set({
        ...schema.state,
        name: user.billing_name || user.name,
        email: user.billing_email || user.email,
      })
    }
    // eslint-disable-next-line
  }, [gqlGetUser.data])
  return element(Page, {
    title: 'Billing',
    subtitle: settings.cluster && settings.cluster.name,
    children: !gqlGetUser.data
      ? null
      : element(Layout, {
          column: true,
          children: [
            gqlGetUser.data.user.stripe_plan
              ? element(Snippet, {
                  key: 'subscription',
                  label: gqlGetUser.data.user.stripe_plan.name || 'Unnamed',
                  value: `$${gqlGetUser.data.user.stripe_plan.amount / 100} ${
                    gqlGetUser.data.user.stripe_plan.currency
                  } every ${gqlGetUser.data.user.stripe_plan.interval_count} ${
                    gqlGetUser.data.user.stripe_plan.interval
                  }`,
                  options: [
                    {
                      icon: 'sliders-h',
                      label: 'Update',
                      helper: 'Change your plan',
                      click: update,
                    },
                    {
                      icon: 'ban',
                      label: 'Cancel',
                      helper: 'Cancel your plan',
                      click: cancel,
                    },
                  ],
                })
              : gqlGetUser.data.user.billable
              ? element(Snippet, {
                  key: 'subscription',
                  label: 'Subscription',
                  value: 'Add a payment plan',
                  click: update,
                })
              : element(Layout, {
                  key: 'subscription',
                  padding: true,
                  styled: true,
                  children: element(Markdown, {
                    value: 'Please add a payment card',
                  }),
                }),
            element(Layout, {
              key: 'layout',
              column: true,
              padding: true,
              divide: true,
              children: [
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
                  key: 'name',
                  divide: true,
                  media: true,
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
                    element(Control, {
                      key: 'email',
                      label: 'Email',
                      helper: 'Payment invoices will be sent here',
                      error: schema.error('email'),
                      children: element(InputString, {
                        value: schema.value('email'),
                        change: schema.change('email'),
                        placeholder: 'fred@example.com',
                      }),
                    }),
                  ],
                }),
                element(Button, {
                  key: 'submit',
                  label: gqlGetUser.data.user.billable ? 'Update' : 'Add',
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
    billable: boolean
    billing_name: string
    billing_email: string
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
        billable
        billing_name
        billing_email
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
