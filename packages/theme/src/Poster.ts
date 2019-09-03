import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export const Poster: FC<{}> = ({}) => {
  const theme = useContext(Theme)
  return create('div', {
    className: css({
      all: 'unset',
    }),
  })
}
