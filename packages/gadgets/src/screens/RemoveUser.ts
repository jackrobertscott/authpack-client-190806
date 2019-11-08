import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const RemoveUser: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Danger Zone',
    subtitle: settings.appname,
    children: null,
  })
}

const useRemoveUser = createUseServer<{
  user: {
    id: string
  }
}>({
  name: 'wgaRemoveUser',
  query: `
    mutation wgaRemoveUser($password: String!) {
      user: wgaRemoveUser(password: $password) {
        id
      }
    }
  `,
})
