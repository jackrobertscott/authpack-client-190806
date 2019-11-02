import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { useStore } from '../hooks/useStore'

export type ICreateWorkspace = {
  change?: () => void
}

export const CreateWorkspace: FC<ICreateWorkspace> = ({ change }) => {
  // initialize the workspace form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('CreateWorkspace', {
    ...schemaCreateWorkspace.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaCreateWorkspace.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaCreateWorkspace
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // create the workspace when the form is submitted
  const createWorkspace = useCreateWorkspace()
  const submit = () => {
    schemaCreateWorkspace
      .validate(value)
      .then(data => createWorkspace.fetch({ options: data }))
      .then(() => {
        if (change) change()
        setTimeout(() =>
          valueStore.change({ ...schemaCreateWorkspace.default() })
        )
      })
  }
  return create(Gadgets.Container, {
    label: 'Create Workspace',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Give the workspace a name',
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
          description: 'A unique identifier for your workspace',
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
          description: 'Short summary of your workspace',
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

const useCreateWorkspace = createUseGraph<{
  workspace: {
    id: string
  }
}>({
  name: 'CreateWorkspace',
  query: `
    mutation CreateWorkspace($options: CreateWorkspaceOptions!) {
      workspace: CreateWorkspace(options: $options) {
        id
      }
    }
  `,
})

const schemaCreateWorkspace = validator.object().shape({
  name: validator.string().required('Please provide a workspace name'),
  tag: validator.string().required('Please provide a unique workspace tag'),
  description: validator.string(),
  domains: validator.array().of(
    validator
      .string()
      .url('Please make sure you use valid urls such as "https://example.com"')
      .required()
  ),
})
