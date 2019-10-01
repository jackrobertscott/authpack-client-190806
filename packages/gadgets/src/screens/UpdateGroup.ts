import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateGroup = {
  id: string
}

export const UpdateGroup: FC<IUpdateGroup> = ({ id }) => {
  // initialize the group form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateGroup.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaUpdateGroup.validateAt(path, update)
  }
  useEffect(() => {
    schemaUpdateGroup
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // load the group and set as default form values
  const retrieveGroup = useRetrieveGroup({
    options: { id },
  })
  useEffect(() => {
    if (retrieveGroup.data)
      valueChange({
        name: retrieveGroup.data.group.name,
        tag: retrieveGroup.data.group.tag,
        description: retrieveGroup.data.group.description,
        domains: retrieveGroup.data.group.domains,
      })
  }, [retrieveGroup.data])
  // update the group when the form is submitted
  const updateGroup = useUpdateGroup()
  const submit = () => {
    schemaUpdateGroup.validate(value).then(data => {
      const options = { ...data, id }
      updateGroup.fetch({ options }, 'UpdateGroup')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Group',
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
          label: 'Update',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useRetrieveGroup = createUseGraph<{
  group: {
    id: string
    name: string
    tag: string
    description: string
    domains: string[]
  }
}>({
  query: `
    query RetrieveGroup($options: RetrieveGroupOptions!) {
      group: RetrieveGroup(options: $options) {
        id
        name
        tag
        description
        domains
      }
    }
  `,
})

const useUpdateGroup = createUseGraph<{
  group: {
    id: string
  }
}>({
  query: `
    mutation UpdateGroup($options: UpdateGroupOptions!) {
      group: UpdateGroup(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateGroup = validator.object().shape({
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
