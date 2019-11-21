import { createElement as create, FC, useState, Fragment } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'
import { LoginUser } from '../screens/LoginUser'
import { SignupUser } from '../screens/TempUser'
import { ForgotUserPassword } from '../screens/ForgotUserPassword'
import { GetStarted } from '../screens/GetStarted'

export const RouterModalUnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const [startup, startupChange] = useState<boolean>(true)
  const router = useLocalRouter({
    nomatch: '/login',
    options: [
      { key: '/login', children: create(LoginUser) },
      { key: '/signup', children: create(SignupUser) },
      { key: '/forgot', children: create(ForgotUserPassword) },
    ],
  })
  const clicker = (screen: string) => () => {
    startupChange(false)
    router.change(screen)
  }
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'unlock',
            label: 'Login',
            focused: router.current && router.current.key === '/login',
            click: clicker('/login'),
          },
          {
            icon: 'plus',
            label: 'Sign Up',
            focused: router.current && router.current.key === '/signup',
            click: clicker('/signup'),
          },
          {
            icon: 'question-circle',
            label: 'Forgot Password?',
            focused: router.current && router.current.key === '/forgot',
            click: clicker('/forgot'),
          },
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            prefix: 'far',
            seperated: true,
          },
        ],
      }),
      startup
        ? create(GetStarted, {
            key: 'started',
            login: clicker('/login'),
            signup: clicker('/signup'),
          })
        : router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
    ],
  })
}
