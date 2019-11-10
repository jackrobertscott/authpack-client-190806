import * as yup from 'yup'
import { createElement as create, FC, useState } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { NoTeam } from './NoTeam'
import { SettingsStore } from '../utils/settings'

export const CreateTeam: FC = () => {
  const settings = useSettings()
  const gqlCreateTeam = useCreateTeam()
  const start = settings.team_required && !settings.team
  const [open, openChange] = useState<boolean>(start)
  const schema = useSchema({
    schema: yup.object().shape({
      name: yup.string().required('Please provide a team name'),
      tag: yup.string().required('Add a unique team id'),
    }),
    submit: value => {
      gqlCreateTeam.fetch(value).then(({ session }) => {
        SettingsStore.update({
          bearer: `Bearer ${session.token}`,
        })
      })
    },
  })
  return create(Gadgets, {
    title: 'Create Team',
    subtitle: settings.appname,
    children: [
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'name',
            label: 'Team Name',
            error: schema.error('name'),
            children: create(InputString, {
              value: schema.value('name'),
              change: schema.change('name'),
              placeholder: 'My Team',
            }),
          }),
          create(Control, {
            key: 'tag',
            label: 'Tag',
            helper: "Claim your team's unique id tag",
            error: schema.error('tag'),
            children: create(InputString, {
              value: schema.value('tag'),
              change: schema.change('tag'),
              placeholder: 'my-team-123',
            }),
          }),
          create(Button, {
            key: 'submit',
            label: 'Login',
            disabled: !schema.valid,
            click: schema.submit,
          }),
        ],
      }),
      open &&
        create(NoTeam, {
          key: 'noteam',
          close: () => openChange(false),
        }),
    ],
  })
}

const useCreateTeam = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation wgaCreateTeam($name: String!, $tag: String!) {
      session: wgaCreateTeam(name: $name, tag: $tag) {
        id
        token
      }
    }
  `,
})
