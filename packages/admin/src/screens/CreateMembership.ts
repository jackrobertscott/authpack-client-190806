import * as yup from 'yup'
import { createElement as create, FC, useEffect, useRef } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputSelect,
  InputBoolean,
  drip,
  Page,
} from 'wga-theme'
import { createUseServer } from '../hooks/useServer'

export const CreateSession: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateSession = useCreateSession()
  const gqlListUsers = useListUsers()
  const gqlListTeams = useListTeams()
  const queryListUsers = useRef(drip(1000, gqlListUsers.fetch))
  const queryListTeams = useRef(drip(1000, gqlListTeams.fetch))
  const schema = useSchema({
    schema: SchemaCreateSession,
    submit: value => {
      gqlCreateSession
        .fetch({ value })
        .then(({ session }) => change && change(session.id))
    },
  })
  useEffect(() => {
    queryListUsers.current()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    schema.change('team_id')(undefined)
    if (schema.value('user_id'))
      queryListTeams.current({ user_id: schema.value('user_id') })
    // eslint-disable-next-line
  }, [schema.value('user_id')])
  return create(Page, {
    title: 'New',
    subtitle: 'Session',
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'user_id',
          label: 'User',
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
        schema.value('user_id') &&
          create(Control, {
            key: 'team_id',
            label: 'Team',
            helper: 'Optionally select a team to be added to session',
            error: schema.error('team_id'),
            children: create(InputSelect, {
              value: schema.value('team_id'),
              change: schema.change('team_id'),
              placeholder: 'Select user...',
              filter: phrase =>
                queryListTeams.current({
                  phrase,
                  user_id: schema.value('user_id'),
                }),
              options: !gqlListTeams.data
                ? []
                : gqlListTeams.data.teams.map(team => ({
                    value: team.id,
                    label: `${team.name} (${team.tag})`,
                    helper: team.description,
                  })),
            }),
          }),
        create(Control, {
          key: 'disabled',
          label: 'Disabled',
          helper: 'Prevent session from authenticating api requests',
          error: schema.error('disabled'),
          children: create(InputBoolean, {
            value: schema.value('disabled'),
            change: schema.change('disabled'),
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateSession.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateSession = yup.object().shape({
  user_id: yup.string().required('Please provide the session user'),
  team_id: yup.string(),
  disabled: yup
    .boolean()
    .required('Please provide the current disabled status')
    .default(false),
})

const useCreateSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation CreateSession($value: CreateSessionValue!) {
      session: CreateSession(value: $value) {
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

const useListTeams = createUseServer<{
  teams: Array<{
    id: string
    name: string
    tag: string
    description: string
  }>
}>({
  query: `
    query ListTeams($phrase: String, $user_id: String!) {
      teams: ListTeams(phrase: $phrase, where: { user_id: $user_id }, options: { limit: 5 }) {
        id
        name
        tag
        description
      }
    }
  `,
})
