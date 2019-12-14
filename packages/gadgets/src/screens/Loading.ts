import { createElement as element, FC, ReactNode } from 'react'
import { Focus } from '@authpack/theme'

export const Loading: FC<{
  helper?: string
  children?: ReactNode
}> = ({ helper, children }) => {
  return element(Focus, {
    icon: 'sync-alt',
    label: 'Loading',
    helper: helper || 'Performing security checks',
    children,
  })
}
