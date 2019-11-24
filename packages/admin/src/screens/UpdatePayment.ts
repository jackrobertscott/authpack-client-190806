import * as yup from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
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
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'
import { UniversalStore } from '../utils/universal'
import { stripe } from '../utils/stripe'
import { useGadgets } from '../hooks/useGadgets'

export const UpdatePayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const universal = useUniversal()
  const gadgets = useGadgets()
  const [stripeCard, stripeCardChange] = useState<any>()
  const [loading, loadingChange] = useState<boolean>(false)
  const gqlUpdatePayment = useUpdatePayment()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      loadingChange(true)
      payment
        .tokenize(stripeCard)
        .then(token => {
          gqlUpdatePayment
            .fetch({
              id: universal.cluster_id,
              input: {
                token: token.id,
                email: value.email,
                name: value.name,
              },
            })
            .then(({ cluster }) => {
              UniversalStore.update({
                power: cluster.power,
                subscribed: cluster.subscribed,
              })
              toaster.add({
                icon: 'credit-card',
                label: 'Success',
                helper: 'You gadgets are active!',
              })
              if (change) change(cluster.id)
            })
            .finally(() => loadingChange(false))
        })
        .catch(error => {
          toaster.add({
            icon: 'credit-card',
            label: 'Card Error',
            helper: error.message || 'There was a problem processing the card',
          })
          loadingChange(false)
        })
    },
  })
  useEffect(() => {
    if (gadgets.user)
      schema.set({
        name: gadgets.user.name,
        email: gadgets.user.email,
      })
  }, [])
  return create(Page, {
    title: 'Payment',
    subtitle: 'Cluster',
    children: [
      !universal.subscribed &&
        create(Poster, {
          key: 'payment',
          icon: 'bolt',
          label: 'Activate',
          helper: 'Add a payment card to activate gadgets',
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
              change: value => stripeCardChange(value),
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
            label: 'Submit',
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
    power: boolean
    subscribed: boolean
  }
}>({
  query: `
    mutation UpdatePaymentClient($id: String!, $input: UpdatePaymentInput!) {
      cluster: UpdatePaymentClient(id: $id, input: $input) {
        id
        power
        subscribed
      }
    }
  `,
})
