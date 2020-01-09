import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
  InputNumber,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreatePlan: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreatePlan = useCreatePlan()
  const schema = useSchema({
    schema: SchemaCreatePlan,
    submit: value => {
      gqlCreatePlan
        .fetch({ value })
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
        element(Layout, {
          key: 'name',
          divide: true,
          media: true,
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
              key: 'tag',
              label: 'Tag',
              helper: 'Unique identifier',
              error: schema.error('tag'),
              children: element(InputString, {
                value: schema.value('tag'),
                change: schema.change('tag'),
                placeholder: 'premium',
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
              key: 'statement',
              label: 'Statement',
              helper: 'The bank statement descriptor',
              error: schema.error('statement'),
              children: element(InputString, {
                value: schema.value('statement'),
                change: schema.change('statement'),
                placeholder: 'PREMIUM',
              }),
            }),
            element(Control, {
              key: 'target',
              label: 'Target',
              helper: 'Who is the plan for?',
              error: schema.error('target'),
              children: element(InputSelect, {
                value: schema.value('target'),
                change: schema.change('target'),
                options: [
                  { value: 'user', label: 'Users' },
                  { value: 'team', label: 'Teams' },
                ],
              }),
            }),
          ],
        }),
        element(Control, {
          key: 'description',
          label: 'Description',
          helper: 'What are users are buying?',
          error: schema.error('description'),
          children: element(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'Users gains access to...',
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
              key: 'interval_separator',
              label: 'Interval Seperator',
              helper: 'Number of intervals between payments',
              error: schema.error('interval_separator'),
              children: element(InputNumber, {
                integer: true,
                value: schema.value('interval_separator'),
                change: schema.change('interval_separator'),
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
  target: yup
    .string()
    .required('Please provide the target value')
    .default('user'),
  name: yup.string().required('Please provide the plan name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the plan tag'),
  description: yup.string(),
  statement: yup
    .string()
    .max(22, 'Statement must be a maximum of 22 characters'),
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
  interval_separator: yup
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
    mutation CreatePlan($value: CreatePlanValue!) {
      plan: CreatePlan(value: $value) {
        id
      }
    }
  `,
})
