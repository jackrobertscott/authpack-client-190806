import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type ICreatePermission = {
  change?: () => void
}

export const CreatePermission: FC<ICreatePermission> = ({ change }) => {
  // initialize the permission form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaCreatePermission.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaCreatePermission.validateAt(path, update)
  }
  useEffect(() => {
    schemaCreatePermission
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // create the permission when the form is submitted
  const createPermission = useCreatePermission()
  const submit = () => {
    schemaCreatePermission
      .validate(value)
      .then(data => createPermission.fetch({ options: data }))
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Create Permission',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Give the permission a name',
          change: validateAndPatch('name'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.name,
              placeholder: 'Editor',
            }),
        }),
        create(Inputs.Control, {
          key: 'tag',
          label: 'Tag',
          description: 'A unique identifier for your permission',
          change: validateAndPatch('tag'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.tag,
              placeholder: 'editor',
            }),
        }),
        create(Inputs.Control, {
          key: 'description',
          label: 'Description',
          description: 'Short summary of your permission',
          change: validateAndPatch('description'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.description,
              placeholder: 'Can edit app entries',
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

const useCreatePermission = createUseGraph<{
  permission: {
    id: string
  }
}>({
  query: `
    mutation CreatePermission($options: CreatePermissionOptions!) {
      permission: CreatePermission(options: $options) {
        id
      }
    }
  `,
})

const schemaCreatePermission = validator.object().shape({
  name: validator.string().required('Please provide a permission name'),
  tag: validator.string().required('Please provide a unique permission tag'),
  description: validator.string(),
})
