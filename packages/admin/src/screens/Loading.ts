import { createElement as create, FC } from 'react'
import { Focus } from 'wga-theme'

export const Loading: FC<{
  helper?: string
}> = ({ helper }) => {
  return create(Focus, {
    icon: 'sync-alt',
    label: 'Loading',
    helper: helper || 'Performing security checks',
  })
}
