import { createElement as create, FC } from 'react'
import { Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { useSettings } from '../hooks/useSettings'

export type ILogoutUser = {}

export const LogoutUser: FC<ILogoutUser> = () => {
  // logout the user when the form is submitted
  const [, settingsChange] = useSettings()
  const logoutUser = useLogoutUser()
  const logout = () => {
    logoutUser
      .fetch()
      .catch(() => Promise.resolve())
      .then(() => settingsChange({ current: undefined }))
  }
  return create(Gadgets.Container, {
    label: 'Logout',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'power-off',
          label: 'Logout',
          description: 'End your session and sign out',
        }),
        create(Button.Container, {
          key: 'logout',
          label: 'Logout',
          click: logout,
        }),
      ],
    }),
  })
}

const useLogoutUser = createUseGraph<{
  user: {
    id: string
  }
}>({
  query: `
    mutation LogoutUser {
      user: LogoutUser {
        id
      }
    }
  `,
})
