import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateWorkspace = {
  id: string
}

export const UpdateWorkspace: FC<IUpdateWorkspace> = ({ id }) => {
  // initialize the workspace form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateWorkspace.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaUpdateWorkspace.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaUpdateWorkspace
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // load the workspace and set as default form values
  const retrieveWorkspace = useRetrieveWorkspace({
    options: { id },
  })
  useEffect(() => {
    if (retrieveWorkspace.data)
      valueChange({
        name: retrieveWorkspace.data.workspace.name,
        tag: retrieveWorkspace.data.workspace.tag,
        description: retrieveWorkspace.data.workspace.description,
        domains: retrieveWorkspace.data.workspace.domains,
      })
  }, [retrieveWorkspace.data])
  // update the workspace when the form is submitted
  const updateWorkspace = useUpdateWorkspace()
  const submit = () => {
    schemaUpdateWorkspace.validate(value).then(data => {
      const options = { ...data, id }
      updateWorkspace.fetch({ options }, 'UpdateWorkspace')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Workspace',
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
          label: 'Update',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useRetrieveWorkspace = createUseGraph<{
  workspace: {
    id: string
    name: string
    tag: string
    description: string
    domains: string[]
  }
}>({
  query: `
    query RetrieveWorkspace($options: RetrieveWorkspaceOptions!) {
      workspace: RetrieveWorkspace(options: $options) {
        id
        name
        tag
        description
        domains
      }
    }
  `,
})

const useUpdateWorkspace = createUseGraph<{
  workspace: {
    id: string
  }
}>({
  query: `
    mutation UpdateWorkspace($options: UpdateWorkspaceOptions!) {
      workspace: UpdateWorkspace(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateWorkspace = validator.object().shape({
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
