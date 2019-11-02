import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IListMembershipsOfWorkspace = {
  id: string
  change?: () => void
}

export const ListMembershipsOfWorkspace: FC<IListMembershipsOfWorkspace> = ({
  id,
}) => {
  // load the membership to show on page
  const retrieveMembership = useRetrieveMembership({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Memberships of Workspace',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: create(Overview.Spacer, {
        children:
          retrieveMembership.data &&
          retrieveMembership.data.workspace.memberships.map(membership => {
            return create(Overview.Container, {
              key: 'Id',
              label: 'Id',
              icon: 'fingerprint',
              value: membership.id,
            })
          }),
      }),
    }),
  })
}

const useRetrieveMembership = createUseGraph<{
  workspace: {
    id: string
    memberships: Array<{
      id: string
      created: string
      updated: string
    }>
  }
}>({
  name: 'ListMembershipsOfWorkspace',
  query: `
    query ListMembershipsOfWorkspace($options: RetrieveWorkspaceOptions!) {
      workspace: RetrieveWorkspace(options: $options) {
        id
        memberships {
          id
          created
          updated
        }
      }
    }
  `,
})
