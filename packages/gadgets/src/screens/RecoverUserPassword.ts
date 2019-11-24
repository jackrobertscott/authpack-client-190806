import * as yup from 'yup'
import { createElement as create, FC, useState } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  Page,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { ReconcileUserPassword } from './ReconcileUserPassword'

export const RecoverUserPassword: FC = () => {
  const settings = useSettings()
  const gqlRecoverUser = useRecoverUser()
  const [email, emailChange] = useState<string | undefined>()
  const schema = useSchema({
    schema: SchemaRecoverUser,
    submit: value => {
      gqlRecoverUser.fetch(value).then(() => {
        emailChange(schema.value('email'))
      })
    },
  })
  return create(Page, {
    title: 'Recover Password',
    subtitle: settings.cluster && settings.cluster.name,
    children: email
      ? create(ReconcileUserPassword, {
          email,
        })
      : create(Layout, {
          column: true,
          padding: true,
          divide: true,
          children: [
            create(Control, {
              key: 'email',
              label: 'Email',
              helper: 'Please provide the email linked to your account',
              error: schema.error('email'),
              children: create(InputString, {
                value: schema.value('email'),
                change: schema.change('email'),
                placeholder: 'example@email.com',
              }),
            }),
            create(Button, {
              key: 'submit',
              label: 'Recover',
              loading: gqlRecoverUser.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
        }),
  })
}

const SchemaRecoverUser = yup.object().shape({
  email: yup
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your email'),
})

const useRecoverUser = createUseServer<{}>({
  query: `
    mutation RecoverUserClient($email: String!) {
      RecoverUserClient(email: $email) { id }
    }
  `,
})
