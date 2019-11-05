import { createElement as create, FC } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'
import { LoginUser } from '../screens/LoginUser'

export const RouterModalUnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const router = useLocalRouter({
    nomatch: '/login',
    options: [{ key: '/login', children: create(LoginUser) }],
  })
  return create(Layout, {
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'unlock',
            label: 'Login',
            click: () => router.change('/login'),
          },
          {
            icon: 'plus',
            label: 'Sign Up',
            click: () => router.change('/signup'),
          },
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            solid: false,
            seperated: true,
          },
        ],
      }),
      router.current &&
        create((() => router.current.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
