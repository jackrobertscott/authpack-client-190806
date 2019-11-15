import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  useStripe,
  Button,
  InputStripe,
  ToasterStore,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'
import { stripe } from '../utils/stripe'
import { UniversalStore } from '../utils/universal'

export const UpdatePayment: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlUpdatePayment = useUpdatePayment()
  const payment = useStripe(stripe)
  const schema = useSchema({
    schema: SchemaUpdatePayment,
    submit: value => {
      payment
        .tokenize(schema.value('card'))
        .then(token => {
          gqlUpdatePayment
            .fetch({
              id: universal.app_id,
              token: token.id,
              name: value.name,
              email: value.email,
            })
            .then(({ app }) => {
              if (change) change(app.id)
              UniversalStore.update({
                power: app.power,
                subscribed: app.subscribed,
              })
            })
        })
        .catch(error => {
          ToasterStore.add({
            icon: 'credit-card',
            label: 'Card Error',
            helper: error.message || 'There was a problem processing the card',
          })
        })
    },
  })
  return create(Gadgets, {
    title: 'Update Payment',
    subtitle: universal.app_name,
    loading: gqlUpdatePayment.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'name',
          label: 'Name',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Fred Blogs',
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
        create(Control, {
          key: 'card',
          label: 'Card',
          error: schema.error('card'),
          children: create(InputStripe, {
            stripe,
            change: schema.change('card'),
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Create',
          disabled: !schema.valid,
          click: schema.submit,
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
  app: {
    id: string
    power: boolean
    subscribed: boolean
  }
}>({
  query: `
    mutation wgaUpdatePayment($id: String!, $token: String!, $name: String!, $email: String!) {
      app: wgaUpdatePayment(id: $id, token: $token, name: $name, email: $email) {
        id
        power
        subscribed
      }
    }
  `,
})
