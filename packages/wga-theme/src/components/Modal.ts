import { createElement as create, FC, ReactNode, useRef } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Portal } from './Portal'
import { Toaster } from './Toaster'
import { Spinner } from './Spinner'

export const Modal: FC<{
  id?: string
  children: ReactNode
  visible?: boolean
  close?: () => void
  large?: boolean
}> = ({ id, children, visible = true, close, large = true }) => {
  const width = large ? 1035 : 515
  const height = large ? 640 : 725
  const theme = useTheme()
  const unfocused = useRef<boolean>(!document.querySelector(':focus-within'))
  return create(Portal, {
    id,
    children: create(Spinner, {
      children: create('div', {
        onClick: (event: any) => {
          const matching = event.target === event.currentTarget
          if (close && matching && unfocused.current) close()
          else unfocused.current = !document.querySelector(':focus-within')
        },
        className: css({
          all: 'unset',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transition: '200ms',
          pointerEvents: visible ? 'all' : 'none',
          opacity: visible ? 1 : 0,
          background: theme.modal.cover,
        }),
        children: create('div', {
          children: !visible
            ? null
            : create(Toaster, {
                children,
              }),
          className: css({
            all: 'unset',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            width,
            height,
            background: theme.modal.background,
            boxShadow: theme.modal.shadow,
            border: theme.modal.border,
            borderRadius: theme.global.radius,
            [`@media (max-width: ${width + 50}px), (max-height: ${height +
              50}px)`]: {
              width: '100%',
              height: '100%',
              flexGrow: 1,
              borderRadius: 0,
              border: 'none',
            },
          }),
        }),
      }),
    }),
  })
}
