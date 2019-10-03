import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { LoginUser } from '../screens/LoginUser'
import { SignUpUser } from '../screens/SignUpUser'
import { ForgotUserPassword } from '../screens/ForgotUserPassword'
import { useSettings } from '../hooks/useSettings'

export type IRouterModalUnauthed = {
  close?: () => void
}

export const RouterModalUnauthed: FC<IRouterModalUnauthed> = ({ close }) => {
  const [settings] = useSettings()
  return create(RouterModal, {
    close,
    visible: settings.open,
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'user-circle',
          label: 'Login',
          children: create(LoginUser),
        },
        {
          icon: 'street-view',
          label: 'Sign Up',
          children: create(SignUpUser),
        },
        {
          icon: 'question-circle',
          label: 'Forgot Password',
          children: create(ForgotUserPassword),
        },
      ],
    }),
  })
}
