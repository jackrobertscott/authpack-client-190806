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
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useSettings } from '../hooks/useSettings'
import { createStripe } from '../utils/stripe'
import { COUNTRIES } from '../utils/countries'

export const UpdateTeamCustomer: FC<{
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
  const [filter, filterChange] = useState<string>('')
  const gqlUpsertPayment = useUpsertTeamPayment()
  const gqlGetTeam = useGetTeam()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      if (!mounted.current) return
      loadingChange(true)
      payment
        .tokenize(stripeCard.current)
        .then(token => {
          return gqlUpsertPayment
            .fetch({
              input: {
                ...value,
                token: token.id,
              },
            })
            .then(({ team }) => {
              if (change) change(team.id)
              gqlGetTeam.fetch()
              const helper =
                gqlGetTeam.data && gqlGetTeam.data.team.stripe_plan
                  ? 'Payment method was successfully accepted'
                  : 'Payment method accepted. You can now add a choose a plan'
              toaster.add({
                icon: 'credit-card',
                label: 'Success',
                helper,
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
        .finally(() => mounted.current && loadingChange(false))
    },
  })
  useEffect(() => {
    gqlGetTeam.fetch()
    if (settings.cluster && settings.cluster.stripe_publishable_key)
      stripeChange(createStripe(settings.cluster.stripe_publishable_key))
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (gqlGetTeam.data) {
      const team = gqlGetTeam.data.team
      if (team.stripe_customer) {
        schema.set({
          ...schema.state,
          name: team.stripe_customer.name,
          email: team.stripe_customer.email,
          country: team.stripe_customer.country,
          zip_code: team.stripe_customer.zip_code,
        })
      }
    }
    // eslint-disable-next-line
  }, [gqlGetTeam.data])
  return element(Page, {
    title: 'Team Billing',
    subtitle: settings.cluster && settings.cluster.name,
    children: !gqlGetTeam.data
      ? null
      : element(Layout, {
          column: true,
          children: [
            gqlGetTeam.data.team.stripe_plan
              ? element(Snippet, {
                  key: 'subscription',
                  label: gqlGetTeam.data.team.stripe_plan.name || 'Unnamed',
                  value: `$${(
                    gqlGetTeam.data.team.stripe_plan.amount / 100
                  ).toFixed(2)} ${
                    gqlGetTeam.data.team.stripe_plan.currency
                  } billed every ${
                    gqlGetTeam.data.team.stripe_plan.interval_count
                  } ${gqlGetTeam.data.team.stripe_plan.interval}s`,
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
              : gqlGetTeam.data.team.billable
              ? element(Snippet, {
                  key: 'subscription',
                  icon: 'exclamation-circle',
                  label: 'Subscription',
                  value: 'Add a payment plan',
                  click: update,
                })
              : element(Layout, {
                  key: 'subscription',
                  padding: true,
                  styled: true,
                  children: element(Markdown, {
                    value: 'Provide a payment method then select a plan.',
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
                        placeholder: 'Super Squad',
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
                        placeholder: 'super_squad@example.com',
                      }),
                    }),
                  ],
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
                          country.toLowerCase().includes(filter.toLowerCase())
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
                  label: gqlGetTeam.data.team.billable ? 'Update' : 'Add',
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
  email: yup
    .string()
    .email('Please use a valid email')
    .required('Please provide a billing email'),
  country: yup
    .string()
    .trim()
    .oneOf(COUNTRIES)
    .required('Please select your country'),
  zip_code: yup
    .string()
    .trim()
    .required('Please provide your zip code'),
})

const useUpsertTeamPayment = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation UpsertTeamStripeCustomerClient($input: UpsertTeamStripeCustomerInput!) {
      team: UpsertTeamStripeCustomerClient(input: $input) {
        id
      }
    }
  `,
})

const useGetTeam = createUseServer<{
  team: {
    billable: boolean
    stripe_customer?: {
      name?: string
      email: string
      country?: string
      zip_code?: string
    }
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
    query GetTeamClient {
      team: GetTeamClient {
        billable
        stripe_customer {
          name
          email
          country
          zip_code
        }
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
