import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ISearch {
  Container: FC<{}>
}

export const Search: ISearch = {
  Container: ({}) => {
    const theme = useContext(Theme)
    return create('div', {
      className: css({
        all: 'unset',
      }),
    })
  },
}
