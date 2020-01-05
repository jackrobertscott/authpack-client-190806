import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowCoupon: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetCoupon = useGetCoupon()
  useEffect(() => {
    gqlGetCoupon.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const coupon = gqlGetCoupon.data ? gqlGetCoupon.data.coupon : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Coupon',
    children: !coupon
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: coupon.id,
            }),
            element(Layout, {
              key: 'name',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'users',
                  label: 'Name',
                  value: coupon.name,
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'tags',
                  label: 'Tag',
                  value: coupon.tag,
                }),
              ],
            }),
            element(Snippet, {
              key: 'description',
              icon: 'book',
              label: 'Description',
              value: coupon.description || '...',
            }),
            element(Layout, {
              key: 'duration',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'stopwatch',
                  label: 'Duration',
                  value: coupon.duration,
                }),
                coupon.duration === 'repeating' &&
                  element(Snippet, {
                    key: 'tag',
                    icon: 'hashtag',
                    label: 'Months',
                    value: coupon.duration_months,
                  }),
              ],
            }),
            element(Layout, {
              key: 'discount',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'hand-holding-heart',
                  label: 'Discount',
                  value:
                    coupon.discount === 'percentage'
                      ? `${coupon.discount_percentage}%`
                      : `$${coupon.discount_amount / 100}`,
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'pause-circle',
                  label: 'Max Redemptions',
                  value: coupon.max_redemptions || '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'dates',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'created',
                  icon: 'clock',
                  label: 'Created',
                  value:
                    coupon.created &&
                    format(new Date(coupon.created), 'dd LLL yyyy @ h:mm a'),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    coupon.updated &&
                    format(new Date(coupon.updated), 'dd LLL yyyy @ h:mm a'),
                }),
              ],
            }),
          ],
        }),
  })
}

const useGetCoupon = createUseServer<{
  coupon: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
    duration: string
    duration_months?: number
    discount: string
    discount_percentage: number
    discount_amount: number
    max_redemptions?: number
  }
}>({
  query: `
    query GetCoupon($id: String!) {
      coupon: GetCoupon(id: $id) {
        id
        created
        updated
        name
        tag
        description
        duration
        duration_months
        discount
        discount_percentage
        discount_amount
        max_redemptions
      }
    }
  `,
})
