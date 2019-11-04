import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, useSchema } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { useLoginUser } from '../graphql/useLoginUser'

export const LoginUser: FC = () => {
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
  const login = useLoginUser()
  // useEffect(() => {
  //   login.fetch({
  //     value: {
  //       email: '',
  //       password: '',
  //     },
  //   })
  // }, [])
  return create(Gadgets, {
    title: 'Login',
    subtitle: settings.state.appname,
    children: null,
  })
}
