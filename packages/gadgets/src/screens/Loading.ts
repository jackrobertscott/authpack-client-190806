import { createElement as create, FC, ReactNode } from 'react'
import { Focus } from '@authpack/theme'

export const Loading: FC<{
  helper?: string
  children?: ReactNode
}> = ({ helper, children }) => {
  return create(Focus, {
    icon: 'sync-alt',
    label: 'Loading',
    helper: helper || 'Performing security checks',
    children,
  })
}
