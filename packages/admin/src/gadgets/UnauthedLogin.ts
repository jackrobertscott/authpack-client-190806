import { createElement as create, FC } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import * as validator from 'yup'

export interface IUnauthedLogin {}

export const UnauthedLogin: FC<IUnauthedLogin> = () => {
  // const schema = validator.object().shape({
  //   name: validator.string().typeError('Please provide your name'),
  //   email: validator
  //     .string()
  //     .email('Please make sure you are using a valid email address')
  //     .typeError('Please provide your name'),
  //   age: validator.number().typeError('Please use a valid number'),
  // })
  // const [form, changeForm] = useState(schema.default())
  return create(Gadgets.Container, {
    label: 'Login',
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
        create(Inputs.Control, {
          key: 'email',
          label: 'Email',
          description: 'Please use a valid email address',
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'fred.blogs@example.com',
            }),
        }),
        create(Inputs.Control, {
          key: 'age',
          label: 'Age',
          description: 'How old are you?',
          change: console.log,
          validate: value =>
            validator
              .number()
              .typeError('Please use a valid number')
              .validate(value),
          input: props =>
            create(Inputs.Number, {
              ...props,
              placeholder: '35',
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
