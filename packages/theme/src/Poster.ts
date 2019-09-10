import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IPoster {
  Container: FC<{}>
}

export const Poster: IPoster = {
  Container: () => {
    const theme = useContext(Theme)
    return create('div', {
      className: css({
        all: 'unset',
      }),
    })
  },
}
