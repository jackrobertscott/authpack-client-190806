import { createElement as create, FC } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'

export type IUnauthedSignup = {}

export const UnauthedSignup: FC<IUnauthedSignup> = () => {
  return create(Gadgets.Container, {
    label: 'Sign Up',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Full name please',
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'Fred Blogs',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Submit',
          click: () => console.log(123),
        }),
      ],
    }),
  })
}
