import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ICode {
  Container: FC<{}>
}

export const Code: ICode = {
  Container: () => {
    const theme = useContext(Theme)
    return create('div', {
      className: css({
        all: 'unset',
      }),
    })
  },
}
