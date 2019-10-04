import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../hooks/useGraph'

export type IRetrieveWorkspace = {
  id: string
  change?: () => void
}

export const RetrieveWorkspace: FC<IRetrieveWorkspace> = ({ id }) => {
  // load the workspace to show on page
  const retrieveWorkspaceGraph = useRetrieveWorkspace({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview Workspace',
    brand: 'Authenticator',
    children: create(Overview.Spacer, {
      children: retrieveWorkspaceGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveWorkspaceGraph.data.workspace.id,
        }),
        create(Overview.Container, {
          key: 'Name',
          label: 'Name',
          icon: 'project-diagram',
          value: retrieveWorkspaceGraph.data.workspace.name,
        }),
        create(Overview.Container, {
          key: 'Tag',
          label: 'Tag',
          icon: 'tags',
          value: retrieveWorkspaceGraph.data.workspace.tag,
        }),
        create(Overview.Container, {
          key: 'Description',
          label: 'Description',
          icon: 'marker',
          value: retrieveWorkspaceGraph.data.workspace.description,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrieveWorkspaceGraph.data.workspace.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrieveWorkspaceGraph.data.workspace.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}

const useRetrieveWorkspace = createUseGraph<{
  workspace: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query RetrieveWorkspace($options: RetrieveWorkspaceOptions!) {
      workspace: RetrieveWorkspace(options: $options) {
        id
        updated
        created
        name
        tag
        description
      }
    }
  `,
})
