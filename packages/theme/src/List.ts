import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IList {
  Container: FC<{}>
}

export const List: IList = {
  Container: ({}) => {
    const theme = useContext(Theme)
    return create('div', {
      className: css({
        all: 'unset',
      }),
    })
  },
}
