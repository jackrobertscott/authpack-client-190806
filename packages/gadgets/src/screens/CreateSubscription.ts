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
  Markdown,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useSettings } from '../hooks/useSettings'
import { createStripe } from '../utils/stripe'
import { COUNTRIES } from '../utils/countries'
import { SettingsStore } from '../utils/settings'

export const CreateSubscription: FC<{
  stripe_plan_id: string
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const mounted = useMounted()
  const settings = useSettings()
  const stripeCard = useRef<any>()
  const [stripe, stripeChange] = useState()
  const [loading, loadingChange] = useState<boolean>(false)
  const [filter, filterChange] = useState<string>('')
  const gqlGetUserAndTeam = useGetUserAndTeam()
  const gqlGetStripePlan = useGetStripePlan()
  const gqlUpsertSubscription = useUpsertSubscription()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpsertSubscription,
    submit: value => {
      loadingChange(true)
      payment
        .tokenize(stripeCard.current)
        .then(token => {
          return gqlUpsertSubscription
            .fetch({
              input: {
                ...value,
                stripe_plan_id: settings.options.prompt_plan,
                token: token.id,
              },
            })
            .then(({ stripe_plan_id }) => {
              if (change) change(stripe_plan_id)
              gqlGetUserAndTeam.fetch().then(({ user, team }) => {
                SettingsStore.update({
                  open: false,
                  user: {
                    ...(SettingsStore.current.user as any),
                    updated: user.updated,
                  },
                  team:
                    team && SettingsStore.current.team
                      ? {
                          ...(SettingsStore.current.team as any),
                          updated: team?.updated,
                        }
                      : undefined,
                })
              })
              toaster.add({
                icon: 'check-circle',
                label: 'Success',
                helper: 'You are now subscribed',
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
    gqlGetUserAndTeam.fetch()
    if (settings.cluster && settings.cluster.stripe_publishable_key)
      stripeChange(createStripe(settings.cluster.stripe_publishable_key))
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (!settings.options.prompt_plan && change) change()
    gqlGetStripePlan
      .fetch({ stripe_plan_id: settings.options.prompt_plan })
      .catch(() => change && change())
    // eslint-disable-next-line
  }, [settings.options.prompt_plan])
  useEffect(() => {
    if (gqlGetUserAndTeam.data) {
      const user = gqlGetUserAndTeam.data.user
      if (user.stripe_customer) {
        schema.set({
          ...schema.state,
          name: user.stripe_customer.name,
          email: user.stripe_customer.email,
          country: user.stripe_customer.country,
          zip_code: user.stripe_customer.zip_code,
        })
      } else {
        schema.set({
          ...schema.state,
          name: user.name,
          email: user.email,
        })
      }
    }
    // eslint-disable-next-line
  }, [gqlGetUserAndTeam.data])
  const planCurrent = gqlGetStripePlan.data && gqlGetStripePlan.data.stripe_plan
  return element(Page, {
    title: planCurrent ? planCurrent.name || 'Payment' : '',
    subtitle:
      planCurrent &&
      (planCurrent.description || (settings.cluster && settings.cluster.name)),
    children:
      !planCurrent || !gqlGetUserAndTeam.data
        ? null
        : element(Layout, {
            column: true,
            children: [
              element(Layout, {
                key: 'details',
                column: true,
                padding: true,
                styled: true,
                children: element(Markdown, {
                  value: `**$${(planCurrent.amount / 100).toFixed(2)}** ${
                    planCurrent.currency
                  } billed every ${planCurrent.interval_count} ${
                    planCurrent.interval
                  }s. This will be set as your ${
                    planCurrent.team_plan ? '**team**' : '**user**'
                  } plan.`.trim(),
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
                  element(Control, {
                    key: 'name',
                    label: 'Name on Card',
                    error: schema.error('name'),
                    children: element(InputString, {
                      value: schema.value('name'),
                      change: schema.change('name'),
                      placeholder: '...',
                    }),
                  }),
                  element(Control, {
                    key: 'email',
                    label: 'Email',
                    error: schema.error('email'),
                    children: element(InputString, {
                      value: schema.value('email'),
                      change: schema.change('email'),
                      placeholder: '...',
                    }),
                  }),
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
                  element(Control, {
                    key: 'submit',
                    helper: 'You can cancel at any time',
                    children: element(Button, {
                      key: 'submit',
                      label: 'Pay Now',
                      disabled: !schema.valid,
                      click: schema.submit,
                      loading,
                    }),
                  }),
                ],
              }),
            ],
          }),
  })
}

const SchemaUpsertSubscription = yup.object().shape({
  name: yup.string().required('Please provide your card name'),
  email: yup.string().required('Please provide your billing email'),
  country: yup.string().required('Please select your country'),
  zip_code: yup.string().required('Please select your zip code'),
  coupon: yup.string(),
})

const useUpsertSubscription = createUseServer<{
  stripe_plan_id: string
}>({
  query: `
    mutation UpsertStripeSubscriptionClient($input: UpsertStripeSubscriptionInput!) {
      stripe_plan_id: UpsertStripeSubscriptionClient(input: $input)
    }
  `,
})

const useGetUserAndTeam = createUseServer<{
  user: {
    name: string
    email: string
    updated: string
    stripe_customer?: {
      name?: string
      email?: string
      country?: string
      zip_code?: string
    }
  }
  team?: {
    updated: string
  }
}>({
  query: `
    query GetUserClient {
      user: GetUserClient {
        name
        email
        updated
        stripe_customer {
          name
          email
          country
          zip_code
        }
      }
      team: GetTeamClient {
        updated
      }
    }
  `,
})

const useGetStripePlan = createUseServer<{
  stripe_plan: {
    id: string
    name?: string
    description?: string
    amount: number
    currency: string
    interval: string
    interval_count: number
    team_plan: boolean
  }
}>({
  query: `
    query GetStripePlanClient($stripe_plan_id: String!) {
      stripe_plan: GetStripePlanClient(stripe_plan_id: $stripe_plan_id) {
        id
        name
        description
        amount
        currency
        interval
        interval_count
        team_plan
      }
    }
  `,
})
