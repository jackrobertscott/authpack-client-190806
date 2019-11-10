import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserPassword: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Change Password',
    subtitle: settings.appname,
    children: null,
  })
}

const useUpdateUserPassword = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation wgaUpdateUserPassword($passwordCurrent: String!, $passwordNew: String!) {
      user: wgaUpdateUserPassword(passwordCurrent: $passwordCurrent, passwordNew: $passwordNew) {
        id
      }
    }
  `,
})
