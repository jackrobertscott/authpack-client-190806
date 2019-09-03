import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IPointer {
  Container: FC<{
    children: ReactNode
    contents: ReactNode
  }>
}

export const Pointer: IPointer = {
  Container: ({ children, contents }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        children,
        create('div', {
          children: create('div', {
            children: contents,
            className: css({
              all: 'unset',
              display: 'flex',
              position: 'absolute',
              left: '10px',
              padding: '15px',
              fontSize: theme.global.fonts,
              borderRadius: theme.global.radius,
              backgroundColor: theme.pointers.background,
              border: theme.pointers.border,
              color: theme.pointers.color,
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
            }),
          }),
          className: `toggle-pointer ${css({
            all: 'unset',
            width: '300px',
            position: 'absolute',
            left: '100%',
            top: '-10px',
            display: 'none',
            alignItems: 'flex-start',
            '&:hover': {
              display: 'flex',
            },
          })}`,
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        position: 'relative',
        '&:hover .toggle-pointer': {
          display: 'flex',
        },
      }),
    })
  },
}
