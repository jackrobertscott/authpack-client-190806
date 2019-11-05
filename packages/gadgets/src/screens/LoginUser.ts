import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { useLoginUser } from '../graphql/useLoginUser'

export const LoginUser: FC = () => {
  const login = useLoginUser()
  const settings = useSettings()
  const schema = useSchema({
    local: 'wga.LoginUser',
    schema: yup.object().shape({
      email: yup
        .string()
        .email('Please make sure you have used a valid email address')
        .required('Please provide your email'),
      password: yup.string().required('Please provide your password'),
    }),
    submit: data => {
      schema.validate(data).then(value => {
        return login.fetch({ value })
      })
    },
  })
  return create(Gadgets, {
    title: 'Login',
    subtitle: settings.state.appname,
    children: create(Layout, {
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
            placeholder: 'example@email.com',
          }),
        }),
        create(Control, {
          key: 'password',
          label: 'Password',
          error: schema.error('password'),
          children: create(InputString, {
            value: schema.value('password'),
            change: schema.change('password'),
            placeholder: '**********',
            password: true,
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Login',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}
