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
  name: 'UpdateUser',
  query: `
    mutation UpdateUser($value: UpdateUserValue!) {
      user: UpdateUser(value: $value) {
        id
      }
    }
  `,
})
