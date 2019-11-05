import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ResetUserPassword: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Reset Password',
    subtitle: settings.state.appname,
    children: null,
  })
}

const useResetUserPassword = createUseServer<{
  user: {
    id: string
  }
}>({
  name: 'ResetUserPassword',
  query: `
    mutation ResetUserPassword($value: ResetUserPasswordValue!) {
      user: ResetUserPassword(value: $value) {
        id
      }
    }
  `,
})
