import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdatePermission = {
  id: string
}

export const UpdatePermission: FC<IUpdatePermission> = ({ id }) => {
  // initialize the permission form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdatePermission.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaUpdatePermission.validateAt(path, update)
  }
  useEffect(() => {
    schemaUpdatePermission
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // load the permission and set as default form values
  const retrievePermission = useRetrievePermission({
    options: { id },
  })
  useEffect(() => {
    if (retrievePermission.data)
      valueChange({
        name: retrievePermission.data.permission.name,
        tag: retrievePermission.data.permission.tag,
        description: retrievePermission.data.permission.description,
      })
  }, [retrievePermission.data])
  // update the permission when the form is submitted
  const updatePermission = useUpdatePermission()
  const submit = () => {
    schemaUpdatePermission.validate(value).then(data => {
      const options = { ...data, id }
      updatePermission.fetch({ options }, 'UpdatePermission')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Permission',
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
              placeholder: 'Awesome Team',
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
              placeholder: 'awesome123',
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
              placeholder: 'We do awesome things',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Update',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useRetrievePermission = createUseGraph<{
  permission: {
    id: string
    name: string
    tag: string
    description: string
  }
}>({
  api: true,
  query: `
    query RetrievePermission($options: RetrievePermissionOptions!) {
      permission: RetrievePermission(options: $options) {
        id
        name
        tag
        description
      }
    }
  `,
})

const useUpdatePermission = createUseGraph<{
  permission: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation UpdatePermission($options: UpdatePermissionOptions!) {
      permission: UpdatePermission(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdatePermission = validator.object().shape({
  name: validator.string(),
  tag: validator.string(),
  description: validator.string(),
})
