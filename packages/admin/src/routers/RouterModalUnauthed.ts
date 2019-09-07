import { createElement as create, FC } from 'react'
import { UnauthedLogin } from '../gadgets/UnauthedLogin'
import { IconbarGadget } from '../templates/IconbarGadget'
import { UnauthedSignup } from '../gadgets/UnauthedSignup'
import { UnauthedPassword } from '../gadgets/UnauthedPassword'

export type IRouterModalUnauthed = {
  close?: () => void
}

export const RouterModalUnauthed: FC<IRouterModalUnauthed> = ({ close }) => {
  return create(IconbarGadget, {
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
  })
}
