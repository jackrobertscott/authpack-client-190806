import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import { Layout, useSchema, InputString, Button, Focus } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const ReconcileUser: FC<{
  email: string
}> = ({ email }) => {
  const gqlRecoverUser = useRecoverUser()
  const gqlReconcileUser = useReconcileUser()
  const schema = useSchema({
    schema: SchemaReconcileUser,
    submit: value => {
      gqlReconcileUser.fetch({ ...value, email }).then(({ session }) => {
        SettingsStore.update({
          bearer: `Bearer ${session.token}`,
        })
      })
    },
  })
  return create(Layout, {
    grow: true,
    children: [
      create(Focus, {
        key: 'poster',
        icon: 'unlock',
        label: 'Verify Email',
        helper: 'A code was sent to your email',
        children: create(Layout, {
          column: true,
          divide: true,
          children: [
            create(InputString, {
              key: 'code',
              value: schema.value('code'),
              change: schema.change('code'),
              placeholder: 'Code...',
            }),
            create(Layout, {
              key: 'layout',
              divide: true,
              children: [
                create(Button, {
                  key: 'submit',
                  label: 'Verify',
                  loading: gqlReconcileUser.loading,
                  disabled: !schema.valid,
                  click: schema.submit,
                }),
                create(Button, {
                  key: 'resend',
                  icon: 'paper-plane',
                  label: 'Resend',
                  loading: gqlRecoverUser.loading,
                  click: () => gqlRecoverUser.fetch({ email }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}

const SchemaReconcileUser = yup.object().shape({
  code: yup.string().required('Please provide your recover code'),
})

const useReconcileUser = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation ReconcileUserClient($email: String!, $code: String!) {
      session: ReconcileUserClient(email: $email, code: $code) {
        id
        token
      }
    }
  `,
})

const useRecoverUser = createUseServer<{}>({
  query: `
    mutation RecoverUserClient($email: String!) {
      RecoverUserClient(email: $email) { id }
    }
  `,
})
