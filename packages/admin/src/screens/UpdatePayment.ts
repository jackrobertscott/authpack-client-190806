import * as yup from 'yup'
import { createElement as create, FC, useState } from 'react'
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
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'
import { UniversalStore } from '../utils/universal'
import { stripe } from '../utils/stripe'

export const UpdatePayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const universal = useUniversal()
  const [loading, loadingChange] = useState<boolean>(false)
  const gqlUpdatePayment = useUpdatePayment()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      loadingChange(true)
      payment
        .tokenize(schema.value('card'))
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
              if (change) change(cluster.id)
              UniversalStore.update({
                power: cluster.power,
                subscribed: cluster.subscribed,
              })
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
  return create(Page, {
    title: 'Payment',
    subtitle: 'Cluster',
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'name',
          label: 'Name On Card',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Fred Blogs',
          }),
        }),
        create(Control, {
          key: 'card',
          label: 'Card',
          helper: 'Powered by Stripe',
          error: schema.error('card'),
          children: create(InputStripe, {
            stripe,
            change: schema.change('card'),
          }),
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
          label: 'Create',
          disabled: !schema.valid,
          click: schema.submit,
          loading,
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
  card: yup.mixed().required('Please provide a payment card'),
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
