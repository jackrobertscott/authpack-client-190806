import { createElement as create, FC } from 'react'
import { Inputs, Button, Gadget } from 'wga-theme'

export interface IUnauthedSignup {}

export const UnauthedSignup: FC<IUnauthedSignup> = () => {
  return create(Gadget.Contents, {
    key: 'contents',
    label: 'Sign Up',
    brand: 'Your App',
    children: create(Gadget.Spacer, {
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
