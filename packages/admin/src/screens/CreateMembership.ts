import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { useStore } from '../hooks/useStore'

export type ICreateMembership = {
  change?: () => void
}

export const CreateMembership: FC<ICreateMembership> = ({ change }) => {
  // initialize the membership form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('CreateMembership', {
    ...schemaCreateMembership.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaCreateMembership.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaCreateMembership
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // create the membership when the form is submitted
  const createMembership = useCreateMembership()
  const submit = () => {
    schemaCreateMembership
      .validate(value)
      .then(data => createMembership.fetch({ options: data }))
      .then(() => {
        if (change) change()
        setTimeout(() =>
          valueStore.change({ ...schemaCreateMembership.default() })
        )
      })
  }
  // update the user options as searched
  const listUsers = useListUsers()
  const listUsersFetch = (search: string = '') =>
    listUsers.fetch({
      options: { limit: 5, search },
    })
  // update the user options as searched
  const listWorkspaces = useListWorkspaces()
  const listWorkspacesFetch = (search: string = '') =>
    listWorkspaces.fetch({
      options: { limit: 5, search },
    })
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
            create(Inputs.Select, {
              ...props,
              value: value.user,
              search: listUsersFetch,
              options:
                listUsers.data &&
                listUsers.data.users.map(user => ({
                  value: user.id,
                  label: user.name || user.username || user.id,
                  description: user.email,
                })),
            }),
        }),
        create(Inputs.Control, {
          key: 'workspace',
          label: 'Workspace',
          description: "Please provide the workspaces's id",
          change: validateAndPatch('workspace'),
          input: props =>
            create(Inputs.Select, {
              ...props,
              value: value.workspace,
              search: listWorkspacesFetch,
              options:
                listWorkspaces.data &&
                listWorkspaces.data.workspaces.map(workspace => ({
                  value: workspace.id,
                  label: workspace.name,
                  description: workspace.id,
                })),
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
  query: `
    mutation CreateMembership($options: CreateMembershipOptions!) {
      membership: CreateMembership(options: $options) {
        id
      }
    }
  `,
})

const useListUsers = createUseGraph<{
  users: Array<{
    id: string
    email: string
    name?: string
    username?: string
  }>
}>({
  query: `
    query ListUsers($options: ListUsersOptions!) {
      users: ListUsers(options: $options) {
        id
        email
        name
        username
      }
    }
  `,
})

const useListWorkspaces = createUseGraph<{
  workspaces: Array<{
    id: string
    name: string
    description?: string
  }>
}>({
  query: `
    query ListWorkspaces($options: ListWorkspacesOptions!) {
      workspaces: ListWorkspaces(options: $options) {
        id
        name
        description
      }
    }
  `,
})

const schemaCreateMembership = validator.object().shape({
  user: validator.string().required('Please provide a valid user id'),
  workspace: validator.string().required('Please provide a valid user id'),
})
