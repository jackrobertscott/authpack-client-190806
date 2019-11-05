import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import { Gadgets, Layout, Control, InputString, useSchema } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const SignupUser: FC = () => {
  const settings = useSettings()
  const schema = useSchema({
    schema: yup.object().shape({
      email: yup
        .string()
        .email('Please make sure you have used a valid email address')
        .required('Please provide your name'),
      password: yup.string().required('Please provide your email'),
    }),
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
              key: 'name',
              label: 'Name',
              helper: 'Please use your full name',
              error: schema.error('name'),
              children: create(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'E.g. Fred Blogs',
              }),
            }),
            create(Control, {
              key: 'name',
              label: 'Name',
              helper: 'Please use your full name',
              error: schema.error('name'),
              children: create(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'E.g. Fred Blogs',
              }),
            }),
          ],
        }),
        create(Control, {
          key: 'name',
          label: 'Name',
          helper: 'Please use your full name',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'E.g. Fred Blogs',
          }),
        }),
      ],
    }),
  })
}
