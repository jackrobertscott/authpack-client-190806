import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ResetUserPassword: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Reset Password',
    subtitle: settings.appname,
    children: null,
  })
}

const useResetUserPassword = createUseServer<{
  user: {
    id: string
  }
}>({
  name: 'wgaResetUserPassword',
  query: `
    mutation wgaResetUserPassword($email: String!, $code: String!, $password: String!) {
      user: wgaResetUserPassword(email: $email, code: $code, password: $password) {
        id
      }
    }
  `,
})
