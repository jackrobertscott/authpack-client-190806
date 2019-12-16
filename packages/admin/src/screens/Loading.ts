import { createElement as element, FC } from 'react'
import { Focus } from '@authpack/theme'

export const Loading: FC<{
  helper?: string
}> = ({ helper }) => {
  return element(Focus, {
    icon: 'sync-alt',
    label: 'Loading',
    helper: helper || 'Performing security checks',
  })
}
