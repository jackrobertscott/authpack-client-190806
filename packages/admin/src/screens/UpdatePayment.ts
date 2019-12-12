import * as yup from 'yup'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { useAuthpack } from '@authpack/react'
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
  Poster,
  useMounted,
} from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'
import { UniversalStore } from '../utils/universal'
import { stripe } from '../utils/stripe'

export const UpdatePayment: FC<{
  change?: (id?: string) => void
  cancel: () => void
}> = ({ change, cancel }) => {
  const toaster = useToaster()
  const universal = useUniversal()
  const authpack = useAuthpack()
  const mounted = useMounted()
  const stripeCard = useRef<any>()
  const [loading, loadingChange] = useState<boolean>(false)
  const gqlUpdatePayment = useUpdatePayment()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      loadingChange(true)
      payment
        .tokenize(stripeCard.current)
        .then(token => {
          return gqlUpdatePayment
            .fetch({
              id: universal.cluster_id,
              input: {
                token: token.id,
                email: value.email,
                name: value.name,
                coupon: value.coupon,
              },
            })
            .then(({ cluster }) => {
              UniversalStore.update({ subscribed: cluster.subscribed })
              toaster.add({
                icon: 'credit-card',
                label: 'Success',
                helper: 'Payment method was successfully accepted',
              })
              if (change) change(cluster.id)
            })
        })
        .catch(error => {
          toaster.add({
            icon: 'credit-card',
            label: 'Card Error',
            helper: error.message || 'There was a problem processing the card',
          })
        })
        .finally(() => loadingChange(false))
    },
  })
  useEffect(() => {
    if (authpack.user)
      schema.set({
        name: authpack.user.name,
        email: authpack.user.email,
      })
    // eslint-disable-next-line
  }, [])
  return create(Page, {
    title: 'Payment',
    subtitle: 'Cluster',
    corner: !universal.subscribed
      ? undefined
      : {
          icon: 'ban',
          label: 'Cancel Subscription',
          click: cancel,
        },
    children: [
      !universal.subscribed &&
        create(Poster, {
          key: 'payment',
          icon: 'bolt',
          label: 'Monthly',
          helper: '$9 usd per 1,000 users',
        }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'card',
            label: 'Card',
            helper: 'Powered by Stripe',
            error: schema.error('card'),
            children: create(InputStripe, {
              stripe,
              change: value => {
                if (mounted.current) stripeCard.current = value
              },
            }),
          }),
          create(Layout, {
            key: 'top',
            divide: true,
            children: [
              create(Control, {
                key: 'name',
                label: 'Name',
                helper: 'Found on card',
                error: schema.error('name'),
                children: create(InputString, {
                  value: schema.value('name'),
                  change: schema.change('name'),
                  placeholder: 'Fred Blogs',
                }),
              }),
              !universal.subscribed &&
                create(Control, {
                  key: 'coupon',
                  label: 'Code',
                  helper: 'Optional payment code',
                  error: schema.error('coupon'),
                  children: create(InputString, {
                    value: schema.value('coupon'),
                    change: schema.change('coupon'),
                    placeholder: '...',
                  }),
                }),
            ],
          }),
          create(Control, {
            key: 'email',
            label: 'Billing Email',
            helper: 'This email will receive payment invoices',
            error: schema.error('email'),
            children: create(InputString, {
              value: schema.value('email'),
              change: schema.change('email'),
              placeholder: 'fred@example.com',
            }),
          }),
          create(Button, {
            key: 'submit',
            label: universal.subscribed ? 'Update Payment' : 'Submit',
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
  name: yup.string().required('Please provide the name on the card'),
  coupon: yup.string(),
  email: yup
    .string()
    .email('Please use a valid email')
    .required('Please provide a billing email'),
})

const useUpdatePayment = createUseServer<{
  cluster: {
    id: string
    subscribed: boolean
  }
}>({
  query: `
    mutation UpdatePaymentClient($id: String!, $input: UpdatePaymentInput!) {
      cluster: UpdatePaymentClient(id: $id, input: $input) {
        id
        subscribed
      }
    }
  `,
})
