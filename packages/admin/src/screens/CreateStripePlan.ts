import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  Page,
  InputNumber,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const CreateStripePlan: FC<{
  stripe_product_id: string
  change?: (id?: string) => void
}> = ({ stripe_product_id, change }) => {
  const universal = useUniversal()
  const gqlCreatePlan = useCreatePlan()
  const schema = useSchema({
    schema: SchemaCreatePlan,
    submit: value => {
      gqlCreatePlan
        .fetch({
          id: universal.cluster_id,
          input: { ...value, stripe_product_id },
        })
        .then(({ plan }) => change && change(plan.id))
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'Plan',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Control, {
          key: 'name',
          label: 'Name',
          helper: 'Human friendly name',
          error: schema.error('name'),
          children: element(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Premium',
          }),
        }),
        element(Control, {
          key: 'description',
          label: 'Description',
          helper: 'What are users are buying?',
          error: schema.error('description'),
          children: element(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'Upgrade and get access to...',
          }),
        }),
        element(Layout, {
          key: 'amount',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'amount',
              label: 'Amount (Cents)',
              helper: 'Price of the plan in cents',
              error: schema.error('amount'),
              children: element(InputNumber, {
                integer: true,
                value: schema.value('amount'),
                change: schema.change('amount'),
                placeholder: '1000 equals $10.00',
              }),
            }),
            element(Control, {
              key: 'currency',
              label: 'Currency',
              helper: 'The currency charged',
              error: schema.error('currency'),
              children: element(InputSelect, {
                value: schema.value('currency'),
                change: schema.change('currency'),
                options: [
                  { value: 'usd', label: 'USD' },
                  { value: 'aud', label: 'AUD' },
                  { value: 'eur', label: 'EUR' },
                ],
              }),
            }),
          ],
        }),
        element(Layout, {
          key: 'interval',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'interval',
              label: 'Interval',
              helper: 'The payment interval',
              error: schema.error('interval'),
              children: element(InputSelect, {
                value: schema.value('interval'),
                change: schema.change('interval'),
                options: [
                  { value: 'day', label: 'Day' },
                  { value: 'week', label: 'Week' },
                  { value: 'month', label: 'Month' },
                  { value: 'year', label: 'Year' },
                ],
              }),
            }),
            element(Control, {
              key: 'interval_count',
              label: 'Interval Seperator',
              helper: 'Number of intervals between payments',
              error: schema.error('interval_count'),
              children: element(InputNumber, {
                integer: true,
                value: schema.value('interval_count'),
                change: schema.change('interval_count'),
                placeholder: '1',
              }),
            }),
          ],
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreatePlan.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreatePlan = yup.object().shape({
  name: yup.string().required('Please provide the plan name'),
  description: yup.string(),
  amount: yup
    .number()
    .min(50, 'Amount must be more than $0.50')
    .required('Please provide an amount'),
  currency: yup
    .string()
    .trim()
    .lowercase()
    .oneOf(['usd', 'aud', 'eur'])
    .default('usd'),
  interval: yup
    .string()
    .trim()
    .lowercase()
    .oneOf(['day', 'week', 'month', 'year'])
    .default('month'),
  interval_count: yup
    .number()
    .min(1)
    .default(1)
    .when('interval', (interval: string, schema: yup.NumberSchema) => {
      switch (interval) {
        case 'day':
          return schema.max(365)
        case 'week':
          return schema.max(52)
        case 'month':
          return schema.max(12)
        case 'year':
          return schema.max(1)
      }
      return schema
    }),
})

const useCreatePlan = createUseServer<{
  plan: {
    id: string
  }
}>({
  query: `
    mutation CreateClusterStripePlanClient($id: String!, $input: CreateClusterStripePlanInput!) {
      plan: CreateClusterStripePlanClient(id: $id, input: $input) {
        id
      }
    }
  `,
})
