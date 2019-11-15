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
  const gqlSwitchTeam = useSwitchTeam()
  const initial = !!settings.app && settings.app.force_teams && !settings.team
  const [open, openChange] = useState<boolean>(initial)
  const schema = useSchema({
    schema: yup.object().shape({
      name: yup.string().required('Please provide a team name'),
      tag: yup.string().required('Add a unique team id'),
    }),
    submit: value => {
      gqlCreateTeam
        .fetch(value)
        .then(({ team }) => gqlSwitchTeam.fetch({ id: team.id }))
        .then(({ session }) => {
          SettingsStore.update({ bearer: `Bearer ${session.token}` })
        })
    },
  })
  return create(Gadgets, {
    title: 'Create Team',
    subtitle: settings.app && settings.app.name,
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
          create(Control, {
            key: 'description',
            label: 'Description',
            helper: 'Add a description for your team',
            error: schema.error('description'),
            children: create(InputString, {
              value: schema.value('description'),
              change: schema.change('description'),
              placeholder: 'We do...',
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
  team: {
    id: string
  }
}>({
  query: `
    mutation wgaCreateTeam($name: String!, $tag: String!) {
      team: wgaCreateTeam(name: $name, tag: $tag) {
        id
      }
    }
  `,
})

const useSwitchTeam = createUseServer<{
  session: {
    token: string
  }
}>({
  query: `
    mutation wgaSwitchTeam($id: String!) {
      session: wgaSwitchTeam(id: $id) {
        token
      }
    }
  `,
})
