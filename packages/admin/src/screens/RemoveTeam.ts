import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'
import { useUniversal } from '../hooks/useUniversal'

export const RemoveTeam: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlRemoveTeam = useRemoveTeam()
  return create(Gadgets, {
    title: 'Remove Team',
    subtitle: universal.app_name,
    children: create(ConfirmRemove, {
      helper: 'Permanently remove this team',
      alert: 'Please confirm the removal of this team',
      change: () => gqlRemoveTeam.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation apiRemoveTeam($id: String!) {
      team: apiRemoveTeam(id: $id) {
        id
      }
    }
  `,
})
