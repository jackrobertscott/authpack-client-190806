import { createElement as create, FC } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'

export interface IUnauthedPassword {}

export const UnauthedPassword: FC<IUnauthedPassword> = () => {
  return create(Gadgets.Container, {
    label: 'Password',
    brand: 'Your App',
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
