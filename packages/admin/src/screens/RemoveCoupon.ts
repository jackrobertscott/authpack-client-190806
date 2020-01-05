import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveCoupon: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveCoupon = useRemoveCoupon()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Coupon',
    children: element(ConfirmRemove, {
      helper: 'Remove this coupon',
      alert: 'Please confirm the removal of this coupon',
      loading: gqlRemoveCoupon.loading,
      change: () =>
        gqlRemoveCoupon.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveCoupon = createUseServer<{
  coupon: {
    id: string
  }
}>({
  query: `
    mutation RemoveCoupon($id: String!) {
      coupon: RemoveCoupon(id: $id) {
        id
      }
    }
  `,
})
