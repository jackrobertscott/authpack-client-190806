import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  InputSelect,
  testAlphanumeric,
  Page,
  InputNumber,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreateCoupon: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateCoupon = useCreateCoupon()
  const schema = useSchema({
    schema: SchemaCreateCoupon,
    submit: value => {
      gqlCreateCoupon
        .fetch({ value })
        .then(({ coupon }) => change && change(coupon.id))
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'Coupon',
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
                placeholder: 'Flash Sale',
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
                placeholder: 'FS123',
              }),
            }),
          ],
        }),
        element(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: element(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'Discount for...',
          }),
        }),
        element(Layout, {
          key: 'duration',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'duration',
              label: 'Duration',
              helper: 'Time coupon remains active',
              error: schema.error('duration'),
              children: element(InputSelect, {
                value: schema.value('duration'),
                change: schema.change('duration'),
                placeholder: 'Select option...',
                options: [
                  {
                    value: 'forever',
                    label: 'Forever',
                    helper: 'Coupon remains active until deleted',
                  },
                  {
                    value: 'once',
                    label: 'Once',
                    helper: 'Can be redeemed one time',
                  },
                  {
                    value: 'repeating',
                    label: 'Repeating',
                    helper: 'Redeemable for a set number of months',
                  },
                ],
              }),
            }),
            schema.value('duration') === 'repeating' &&
              element(Control, {
                key: 'duration_months',
                label: 'Months',
                helper: 'Number of months active',
                error: schema.error('duration_months'),
                children: element(InputNumber, {
                  integer: true,
                  value: schema.value('duration_months'),
                  change: schema.change('duration_months'),
                  placeholder: '...',
                }),
              }),
          ],
        }),
        element(Layout, {
          key: 'discount',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'discount_type',
              label: 'Type',
              helper: 'How the discount is applied',
              error: schema.error('discount_type'),
              children: element(InputSelect, {
                value: schema.value('discount_type'),
                change: schema.change('discount_type'),
                placeholder: 'Select option...',
                options: [
                  {
                    value: 'percentage',
                    label: 'Percentage',
                    helper: 'Discount a percent of price',
                  },
                  {
                    value: 'amount',
                    label: 'Amount',
                    helper: 'Discount exact amount',
                  },
                ],
              }),
            }),
            schema.value('discount_type') === 'percentage' &&
              element(Control, {
                key: 'discount_percentage',
                label: 'Percentage',
                helper: 'Discount off price in percent',
                error: schema.error('discount_percentage'),
                children: element(InputNumber, {
                  integer: true,
                  value: schema.value('discount_percentage'),
                  change: schema.change('discount_percentage'),
                  placeholder: '...',
                }),
              }),
            schema.value('discount_type') === 'amount' &&
              element(Control, {
                key: 'discount_amount',
                label: 'Amount (cents)',
                helper: 'Dicount off price in cents',
                error: schema.error('discount_amount'),
                children: element(InputNumber, {
                  integer: true,
                  value: schema.value('discount_amount'),
                  change: schema.change('discount_amount'),
                  placeholder: '...',
                }),
              }),
          ],
        }),
        element(Control, {
          key: 'max_redemptions',
          label: 'Limit Redemptions',
          helper:
            'Optionally set the maximum number of times the coupon can be used',
          error: schema.error('max_redemptions'),
          children: element(InputNumber, {
            integer: true,
            value: schema.value('max_redemptions'),
            change: schema.change('max_redemptions'),
            placeholder: '...',
          }),
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateCoupon.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateCoupon = yup.object().shape({
  name: yup.string().required('Please provide the coupon name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the coupon tag'),
  description: yup.string(),
  duration: yup
    .string()
    .oneOf(['forever', 'once', 'repeating'])
    .required('Please select a duration'),
  duration_months: yup.number().when('duration', {
    is: 'repeating',
    then: yup
      .number()
      .min(1, 'Duration must be more than 1 month')
      .required('Please provide the duration months'),
  }),
  discount_type: yup
    .string()
    .oneOf(['percentage', 'amount'])
    .required('Please select the type of discount'),
  discount_percentage: yup.number().when('discount_type', {
    is: 'percentage',
    then: yup
      .number()
      .min(0, 'Discount must be more than 0')
      .max(100, 'Discount must be less than 100')
      .required('Please provide the discount percentage'),
  }),
  discount_amount: yup.number().when('discount_type', {
    is: 'amount',
    then: yup
      .number()
      .min(0, 'Discount must be more than 0')
      .required('Please provide the discount amount'),
  }),
  max_redemptions: yup.number().min(0),
})

const useCreateCoupon = createUseServer<{
  coupon: {
    id: string
  }
}>({
  query: `
    mutation CreateCoupon($value: CreateCouponValue!) {
      coupon: CreateCoupon(value: $value) {
        id
      }
    }
  `,
})
