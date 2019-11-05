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
import { useSignupUser } from '../graphql/useSignupUser'
import { transformParamCase } from '../utils/yup'

export const SignupUser: FC = () => {
  const gql = useSignupUser()
  const settings = useSettings()
  const schema = useSchema({
    local: 'wga.SignupUser',
    schema: yup.object().shape({
      given_name: yup.string().required('Please provide your given name'),
      family_name: yup.string().required('Please provide your family name'),
      username: yup
        .string()
        .transform(transformParamCase)
        .required('Please provide your username'),
      email: yup
        .string()
        .email('Please make sure you have used a valid email address')
        .required('Please provide your email'),
      password: yup.string().required('Please provide your password'),
    }),
    submit: data => {
      schema.validate(data).then(value => {
        return gql.fetch({ value })
      })
    },
  })
  return create(Gadgets, {
    title: 'Sign Up',
    subtitle: settings.state.appname,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Layout, {
          divide: true,
          children: [
            create(Control, {
              key: 'given_name',
              label: 'First Name',
              error: schema.error('given_name'),
              children: create(InputString, {
                value: schema.value('given_name'),
                change: schema.change('given_name'),
                placeholder: 'Fred',
              }),
            }),
            create(Control, {
              key: 'family_name',
              label: 'Last Name',
              error: schema.error('family_name'),
              children: create(InputString, {
                value: schema.value('family_name'),
                change: schema.change('family_name'),
                placeholder: 'Blogs',
              }),
            }),
          ],
        }),
        create(Control, {
          key: 'username',
          label: 'Username',
          error: schema.error('username'),
          children: create(InputString, {
            value: schema.value('username'),
            change: schema.change('username'),
            placeholder: 'example-username-123',
          }),
        }),
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
