import { createElement as create, FC, useState, Fragment } from 'react'
import { Poster, Layout, Button, Focus } from '@authpack/theme'

export const ConfirmRemove: FC<{
  helper: string
  alert: string
  keyword?: string
  loading?: boolean
  change: () => void
}> = ({ helper, alert, keyword = 'Remove', change, loading }) => {
  const [confirm, confirmChange] = useState<boolean>(false)
  return create(Fragment, {
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'trash-alt',
        label: keyword,
        helper,
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: create(Button, {
          label: keyword,
          click: () => confirmChange(true),
        }),
      }),
      create(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: alert,
        visible: confirm,
        children: create(Layout, {
          divide: true,
          media: true,
          children: [
            create(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              click: change,
              loading,
            }),
            create(Button, {
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
