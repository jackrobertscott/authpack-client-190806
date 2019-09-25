import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { UnauthedLogin } from '../screens/UnauthedLogin'
import { UnauthedSignup } from '../screens/UnauthedSignup'
import { UnauthedPassword } from '../screens/UnauthedPassword'

export type IRouterModalUnauthed = {
  close?: () => void
}

export const RouterModalUnauthed: FC<IRouterModalUnauthed> = ({ close }) => {
  return create(RouterModal, {
    close,
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'user-circle',
          label: 'Login',
          children: create(UnauthedLogin),
        },
        {
          icon: 'street-view',
          label: 'Sign Up',
          children: create(UnauthedSignup),
        },
        {
          icon: 'question-circle',
          label: 'Forgotten Password',
          children: create(UnauthedPassword),
        },
      ],
    }),
  })
}
