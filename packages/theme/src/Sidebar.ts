import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ISidebar {
  Container: FC<{}>
}

export const Sidebar: ISidebar = {
  Container: ({}) => {
    const theme = useContext(Theme)
    return create('div', {
      className: css({
        all: 'unset',
      }),
    })
  },
}
