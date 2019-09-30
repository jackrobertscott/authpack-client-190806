import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../hooks/useGraph'

export type IRetrieveGroup = {
  id: string
  change?: () => void
}

export const RetrieveGroup: FC<IRetrieveGroup> = ({ id }) => {
  // load the group to show on page
  const retrieveGroupGraph = useRetrieveGroup({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview Group',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: retrieveGroupGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveGroupGraph.data.group.id,
        }),
        create(Overview.Container, {
          key: 'Name',
          label: 'Name',
          icon: 'project-diagram',
          value: retrieveGroupGraph.data.group.name,
        }),
        create(Overview.Container, {
          key: 'Tag',
          label: 'Tag',
          icon: 'tags',
          value: retrieveGroupGraph.data.group.tag,
        }),
        create(Overview.Container, {
          key: 'Description',
          label: 'Description',
          icon: 'marker',
          value: retrieveGroupGraph.data.group.description,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrieveGroupGraph.data.group.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrieveGroupGraph.data.group.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}

const useRetrieveGroup = createUseGraph<{
  group: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query RetrieveGroup($options: RetrieveGroupOptions!) {
      group: RetrieveGroup(options: $options) {
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
