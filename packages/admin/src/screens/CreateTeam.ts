import * as yup from 'yup'
import { createElement as element, FC, useEffect, useRef } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  InputSelect,
  drip,
  testAlphanumeric,
  Page,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreateTeam: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
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
  return element(Page, {
    title: 'New',
    subtitle: 'Team',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Layout, {
          key: 'name',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'name',
              label: 'Name',
              helper: 'Human friendly name',
              error: schema.error('name'),
              children: element(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'Super Squad',
              }),
            }),
            element(Control, {
              key: 'tag',
              label: 'Tag',
              helper: 'Unique identifier',
              error: schema.error('tag'),
              children: element(InputString, {
                value: schema.value('tag'),
                change: schema.change('tag'),
                placeholder: 'super_squad',
              }),
            }),
          ],
        }),
        element(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: element(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'We do...',
          }),
        }),
        element(Control, {
          key: 'user_id',
          label: 'Admin User',
          error: schema.error('user_id'),
          children: element(InputSelect, {
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
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateTeam.loading,
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
