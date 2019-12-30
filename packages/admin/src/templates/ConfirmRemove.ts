import { createElement as element, FC, useState, Fragment } from 'react'
import { Poster, Layout, Button, Focus } from '@authpack/theme'

export const ConfirmRemove: FC<{
  helper: string
  alert: string
  keyword?: string
  loading?: boolean
  change: () => void
}> = ({ helper, alert, keyword = 'Remove', change, loading }) => {
  const [confirm, confirmChange] = useState<boolean>(false)
  return element(Fragment, {
    children: [
      element(Poster, {
        key: 'poster',
        icon: 'trash-alt',
        label: keyword,
        helper,
      }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: element(Button, {
          label: keyword,
          click: () => confirmChange(true),
        }),
      }),
      element(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: alert,
        visible: confirm,
        children: element(Layout, {
          divide: true,
          media: true,
          children: [
            element(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              click: change,
              loading,
            }),
            element(Button, {
              key: 'cancel',
              minor: true,
              icon: 'times',
              label: 'Cancel',
              click: () => confirmChange(false),
            }),
          ],
        }),
      }),
    ],
  })
}
