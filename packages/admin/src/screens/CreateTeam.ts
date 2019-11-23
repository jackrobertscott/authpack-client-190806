import * as yup from 'yup'
import { createElement as create, FC, useEffect, useRef } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  InputSelect,
  drip,
  testAlphanumeric,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const CreateTeam: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlCreateTeam = useCreateTeam()
  const gqlListUsers = useListUsers()
  const queryListUsers = useRef(drip(1000, gqlListUsers.fetch))
  const schema = useSchema({
    schema: SchemaCreateTeam,
    submit: value => {
      gqlCreateTeam
        .fetch({ value })
        .then(({ team }) => change && change(team.id))
    },
  })
  useEffect(() => {
    queryListUsers.current()
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Create Team',
    subtitle: universal.cluster_name,
    loading: gqlCreateTeam.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'name',
          label: 'Name',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Awesome People',
          }),
        }),
        create(Control, {
          key: 'tag',
          label: 'Tag',
          helper: 'A unique identifier for the team',
          error: schema.error('tag'),
          children: create(InputString, {
            value: schema.value('tag'),
            change: schema.change('tag'),
            placeholder: 'awesome_people',
          }),
        }),
        create(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: create(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'We do...',
          }),
        }),
        create(Control, {
          key: 'user_id',
          label: 'Admin User',
          error: schema.error('user_id'),
          children: create(InputSelect, {
            value: schema.value('user_id'),
            change: schema.change('user_id'),
            placeholder: 'Select user...',
            filter: phrase => queryListUsers.current({ phrase }),
            options: !gqlListUsers.data
              ? []
              : gqlListUsers.data.users.map(user => ({
                  value: user.id,
                  label:
                    user.name && user.username
                      ? `${user.name} - ${user.username}`
                      : user.name || user.username,
                  helper: user.email,
                })),
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Create',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateTeam = yup.object().shape({
  name: yup.string().required('Please provide the team name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the team tag'),
  description: yup.string(),
  user_id: yup.string().required('Please select an admin user'),
})

const useCreateTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation CreateTeam($value: CreateTeamValue!) {
      team: CreateTeam(value: $value) {
        id
      }
    }
  `,
})

const useListUsers = createUseServer<{
  users: Array<{
    id: string
    name: string
    email: string
    username: string
  }>
}>({
  query: `
    query ListUsers($phrase: String) {
      users: ListUsers(phrase: $phrase, options: { limit: 5 }) {
        id
        name
        email
        username
      }
    }
  `,
})
