import * as yup from 'yup'
import { createElement as create, FC, Fragment } from 'react'
import {
  Layout,
  Control,
  useSchema,
  InputString,
  Button,
  Poster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const ReconcileUserPassword: FC<{
  email: string
}> = ({ email }) => {
  const gqlReconcileUser = useReconcileUser()
  const schema = useSchema({
    schema: SchemaReconcileUser,
    submit: value => {
      gqlReconcileUser.fetch({ ...value, email }).then(({ session }) => {
        schema.change('password')('')
        SettingsStore.update({
          open: false,
          bearer: `Bearer ${session.token}`,
        })
      })
    },
  })
  return create(Fragment, {
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'unlock',
        label: 'Update Password',
        helper: 'A code was sent to your email',
      }),
      create(Layout, {
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'code',
            label: 'Code',
            error: schema.error('code'),
            children: create(InputString, {
              value: schema.value('code'),
              change: schema.change('code'),
              placeholder: '1234567890',
            }),
          }),
          create(Control, {
            key: 'password',
            label: 'New Password',
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
            label: 'Update Password',
            loading: gqlReconcileUser.loading,
            disabled: !schema.valid,
            click: schema.submit,
          }),
        ],
      }),
    ],
  })
}

const SchemaReconcileUser = yup.object().shape({
  code: yup.string().required('Please provide your recover code'),
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please provide your password'),
})

const useReconcileUser = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation ReconcileUserClient($email: String!, $code: String!, $password: String!) {
      session: ReconcileUserClient(email: $email, code: $code, password: $password) {
        id
        token
      }
    }
  `,
})
