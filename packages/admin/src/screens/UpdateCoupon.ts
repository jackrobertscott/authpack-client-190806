import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateCoupon: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetCoupon = useGetCoupon()
  const gqlUpdateCoupon = useUpdateCoupon()
  const schema = useSchema({
    schema: SchemaUpdateCoupon,
    submit: value => {
      gqlUpdateCoupon.fetch({ id, value }).then(({ coupon }) => {
        if (change) change(coupon.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetCoupon.fetch({ id }).then(({ coupon }) => schema.set(coupon))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Coupon',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetCoupon.data
        ? null
        : [
            element(Control, {
              key: 'name',
              label: 'Name',
              helper: 'Human friendly name',
              error: schema.error('name'),
              children: element(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'Super Squad',
              }),
            }),
            element(Control, {
              key: 'description',
              label: 'Description',
              error: schema.error('description'),
              children: element(InputString, {
                value: schema.value('description'),
                change: schema.change('description'),
                placeholder: 'We do...',
              }),
            }),
            element(Button, {
              key: 'submit',
              label: 'Save',
              loading: gqlGetCoupon.loading || gqlUpdateCoupon.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateCoupon = yup.object().shape({
  name: yup.string().required('Please provide the coupon name'),
  description: yup.string(),
})

const useGetCoupon = createUseServer<{
  coupon: {
    name: string
    description?: string
  }
}>({
  query: `
    query GetCoupon($id: String!) {
      coupon: GetCoupon(id: $id) {
        name
        description
      }
    }
  `,
})

const useUpdateCoupon = createUseServer<{
  coupon: {
    id: string
  }
}>({
  query: `
    mutation UpdateCoupon($id: String!, $value: UpdateCouponValue!) {
      coupon: UpdateCoupon(id: $id, value: $value) {
        id
      }
    }
  `,
})
