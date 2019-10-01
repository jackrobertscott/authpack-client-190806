import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { useStore } from '../hooks/useStore'

export type ICreateGroup = {
  change?: () => void
}

export const CreateGroup: FC<ICreateGroup> = ({ change }) => {
  // initialize the group form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('CreateGroup', {
    ...schemaCreateGroup.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaCreateGroup.validateAt(path, update)
  }
  useEffect(() => {
    schemaCreateGroup
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // create the group when the form is submitted
  const createGroup = useCreateGroup()
  const submit = () => {
    schemaCreateGroup
      .validate(value)
      .then(data => createGroup.fetch({ options: data }))
      .then(() => {
        if (change) change()
        setTimeout(() => valueStore.change({ ...schemaCreateGroup.default() }))
      })
  }
  return create(Gadgets.Container, {
    label: 'Create Group',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Give the group a name',
          change: validateAndPatch('name'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.name,
              placeholder: 'Awesome Team',
            }),
        }),
        create(Inputs.Control, {
          key: 'tag',
          label: 'Tag',
          description: 'A unique identifier for your group',
          change: validateAndPatch('tag'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.tag,
              placeholder: 'awesome123',
            }),
        }),
        create(Inputs.Control, {
          key: 'description',
          label: 'Description',
          description: 'Short summary of your group',
          change: validateAndPatch('description'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.description,
              placeholder: 'We do awesome things',
            }),
        }),
        create(Inputs.Control, {
          key: 'domains',
          label: 'Domains',
          description: 'The whitelisted domains of your app',
          change: validateAndPatch('domains'),
          input: props =>
            create(Inputs.StringArray, {
              ...props,
              value: value.domains,
              placeholder: 'E.g. https://www.yourapp.com',
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

const useCreateGroup = createUseGraph<{
  group: {
    id: string
  }
}>({
  query: `
    mutation CreateGroup($options: CreateGroupOptions!) {
      group: CreateGroup(options: $options) {
        id
      }
    }
  `,
})

const schemaCreateGroup = validator.object().shape({
  name: validator.string().required('Please provide a group name'),
  tag: validator.string().required('Please provide a unique group tag'),
  description: validator.string(),
  domains: validator.array().of(
    validator
      .string()
      .url('Please make sure you use valid urls such as "https://example.com"')
      .required()
  ),
})
