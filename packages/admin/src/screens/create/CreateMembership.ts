import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../../hooks/useGraph'

export type ICreateMembership = {
  change?: () => void
}

export const CreateMembership: FC<ICreateMembership> = ({ change }) => {
  // initialize the membership form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaCreateMembership.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaCreateMembership.validateAt(path, update)
  }
  useEffect(() => {
    schemaCreateMembership
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // create the membership when the form is submitted
  const createMembership = useCreateMembership()
  const submit = () => {
    schemaCreateMembership
      .validate(value)
      .then(data => createMembership.fetch({ options: data }))
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Create Membership',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'user',
          label: 'User',
          description: "Please provide the user's id",
          change: validateAndPatch('user'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.user,
              placeholder: '5d82f23f07a5ffda65850000',
            }),
        }),
        create(Inputs.Control, {
          key: 'group',
          label: 'Group',
          description: "Please provide the groups's id",
          change: validateAndPatch('group'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.group,
              placeholder: '5d82f23f07a5ffda65850000',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Create',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useCreateMembership = createUseGraph<{
  membership: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation CreateMembership($options: CreateMembershipOptions!) {
      membership: CreateMembership(options: $options) {
        id
      }
    }
  `,
})

const schemaCreateMembership = validator.object().shape({
  user: validator.string().required('Please provide a valid user id'),
  group: validator.string().required('Please provide a valid user id'),
})
