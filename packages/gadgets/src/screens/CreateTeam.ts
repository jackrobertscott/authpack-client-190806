import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const CreateTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Create Team',
    subtitle: settings.appname,
    children: null,
  })
}

const useCreateTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  name: 'CreateTeam',
  query: `
    mutation CreateTeam($value: CreateTeamValue!) {
      team: CreateTeam(value: $value) {
        id
      }
    }
  `,
})
