import * as yup from 'yup'
import { createElement as create, FC, useEffect, useRef } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputSelect,
  drip,
} from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const CreateSession: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const global = useGlobal()
  const gqlCreateSession = useCreateSession()
  const gqlListUsers = useListUsers()
  const gqlListTeams = useListTeams()
  const queryListUsers = useRef(drip(500, gqlListUsers.fetch))
  const queryListTeams = useRef(drip(500, gqlListTeams.fetch))
  const schema = useSchema({
    schema: SchemaCreateSession,
    change: console.log,
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
  }, [schema.value('user_id')])
  return create(Gadgets, {
    title: 'Create Session',
    subtitle: global.appname,
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
            filter: regex => queryListUsers.current({ regex }),
            options: !gqlListUsers.data
              ? []
              : gqlListUsers.data.users.map(user => ({
                  value: user.id,
                  label:
                    user.name && user.username
                      ? `${user.name} (${user.username})`
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
              filter: regex =>
                queryListTeams.current({
                  regex,
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

const SchemaCreateSession = yup.object().shape({
  user_id: yup.string().required('Please provide the session user'),
  team_id: yup.string(),
})

const useCreateSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation apiCreateSession($value: CreateSessionValue!) {
      session: apiCreateSession(value: $value) {
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
    query apiListUsers($regex: String) {
      users: apiListUsers(regex: $regex, options: { limit: 5 }) {
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
    query apiListTeams($regex: String, $user_id: String!) {
      teams: apiListTeams(regex: $regex, where: { user_id: $user_id }, options: { limit: 5 }) {
        id
        name
        tag
        description
      }
    }
  `,
})
