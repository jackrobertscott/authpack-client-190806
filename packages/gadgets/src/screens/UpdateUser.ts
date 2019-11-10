import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateUser: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Update User',
    subtitle: settings.appname,
    children: null,
  })
}

const useUpdateUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation wgaUpdateUser($email: String, $password: String, $username: String, $given_name: String, $family_name: String) {
      user: wgaUpdateUser(email: $email, password: $password, username: $username, given_name: $given_name, family_name: $family_name) {
        id
      }
    }
  `,
})
