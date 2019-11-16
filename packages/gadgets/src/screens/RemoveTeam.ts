import * as yup from 'yup'
import { createElement as create, FC, useState } from 'react'
import {
  Gadgets,
  Poster,
  Layout,
  Control,
  useSchema,
  Focus,
  Button,
  InputString,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const RemoveTeam: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlRemoveTeam = useRemoveTeam()
  const schema = useSchema({ schema: SchemaPassword })
  const [confirm, confirmChange] = useState<boolean>(false)
  return create(Gadgets, {
    title: 'Danger Zone',
    subtitle: settings.app && settings.app.name,
    loading: gqlRemoveTeam.loading,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'fire-alt',
        label: 'Remove',
        helper: 'Permanently remove this team and all members',
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'password',
            label: 'Current Password',
            helper: 'Please provide your password',
            error: schema.error('password'),
            children: create(InputString, {
              value: schema.value('password'),
              change: schema.change('password'),
              placeholder: '* * * * * * * *',
              password: true,
            }),
          }),
          create(Button, {
            key: 'submit',
            label: 'Update',
            disabled: !schema.valid,
            click: () => confirmChange(true),
          }),
        ],
      }),
      create(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: 'Please confirm the removal of this team',
        visible: confirm,
        children: create(Layout, {
          divide: true,
          children: [
            create(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              click: () =>
                gqlRemoveTeam.fetch({ ...schema.state }).then(() => {
                  if (change) change()
                  SettingsStore.update({
                    team: undefined,
                  })
                }),
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

const SchemaPassword = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password is required'),
})

const useRemoveTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation wgaRemoveTeam($id: String!) {
      team: wgaRemoveTeam(id: $id) {
        id
      }
    }
  `,
})
