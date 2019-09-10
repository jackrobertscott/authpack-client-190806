import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IToaster {
  Container: FC<{}>
}

export const Toaster: IToaster = {
  Container: () => {
    const theme = useContext(Theme)
    return create('div', {
      className: css({
        all: 'unset',
      }),
    })
  },
}
