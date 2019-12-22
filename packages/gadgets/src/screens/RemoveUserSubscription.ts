import * as yup from 'yup'
import { createElement as element, FC, useState } from 'react'
import {
  useSchema,
  Control,
  InputString,
  Button,
  Poster,
  Layout,
  Focus,
  Page,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const RemoveUserSubscription: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlRemoveUser = useRemoveUser()
  const schema = useSchema({ schema: SchemaPassword })
  const [confirm, confirmChange] = useState<boolean>(false)
  return element(Page, {
    title: 'Danger',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      element(Poster, {
        key: 'poster',
        icon: 'trash-alt',
        label: 'Remove',
        helper: 'Remove your account',
      }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          element(Control, {
            key: 'password',
            label: 'Current Password',
            helper: 'Please provide your password',
            error: schema.error('password'),
            children: element(InputString, {
              value: schema.value('password'),
              change: schema.change('password'),
              placeholder: '* * * * * * * *',
              password: true,
            }),
          }),
          element(Button, {
            key: 'submit',
            label: 'Remove',
            disabled: !schema.valid,
            click: () => confirmChange(true),
          }),
        ],
      }),
      element(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: 'Please confirm the removal of this user',
        visible: confirm,
        children: element(Layout, {
          divide: true,
          media: true,
          children: [
            element(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              loading: gqlRemoveUser.loading,
              click: () =>
                gqlRemoveUser.fetch({ ...schema.state }).then(() => {
                  SettingsStore.update({ bearer: undefined })
                  if (change) change()
                }),
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

const SchemaPassword = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password is required'),
})

const useRemoveUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation RemoveUserClient($password: String!) {
      user: RemoveUserClient(password: $password) {
        id
      }
    }
  `,
})
