import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  useSchema,
  Poster,
  Layout,
  Control,
  InputString,
  Button,
  useToaster,
  Page,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const UpdateUserEmail: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlUpdateEmail = useUpdateEmail()
  const schema = useSchema({
    schema: SchemaUpdateEmail,
    submit: value => {
      gqlUpdateEmail.fetch(value).then(({ user }) => {
        if (change) change(user.id)
        schema.reset()
        toaster.add({
          icon: 'check',
          label: 'Success',
          helper: 'Email has been changed',
        })
        SettingsStore.update({
          user: {
            ...settings.user!,
            email: user.email,
            verified: user.verified,
          },
        })
      })
    },
  })
  return create(Page, {
    title: 'Email',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'at',
        label: 'Update Email',
        helper: 'You will need to reverify your account',
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'email',
            label: 'Email',
            error: schema.error('email'),
            children: create(InputString, {
              value: schema.value('email'),
              change: schema.change('email'),
              placeholder: 'email@example.com',
            }),
          }),
          create(Button, {
            key: 'submit',
            label: 'Update',
            loading: gqlUpdateEmail.loading,
            disabled: !schema.valid,
            click: schema.submit,
          }),
        ],
      }),
    ],
  })
}

const SchemaUpdateEmail = yup.object().shape({
  email: yup
    .string()
    .email('Please use a valid email address')
    .required('Email is required'),
})

const useUpdateEmail = createUseServer<{
  user: {
    id: string
    email: string
    verified: boolean
  }
}>({
  query: `
    mutation UpdateUserEmailClient($email: String!) {
      user: UpdateUserEmailClient(email: $email) {
        id
        email
        verified
      }
    }
  `,
})
