import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/GadgetsRemove'
import { useGlobal } from '../hooks/useGlobal'

export const RemoveSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const global = useGlobal()
  const gqlRemoveSession = useRemoveSession()
  return create(Gadgets, {
    title: 'Remove Session',
    subtitle: global.appname,
    children: create(ConfirmRemove, {
      helper: 'Permanently remove this session',
      alert: 'Please confirm the removal of this session',
      change: () =>
        gqlRemoveSession.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation apiRemoveSession($id: String!) {
      session: apiRemoveSession(id: $id) {
        id
      }
    }
  `,
})
