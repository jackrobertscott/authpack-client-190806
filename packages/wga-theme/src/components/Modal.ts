import {
  createElement as create,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const Modal: FC<{
  children: ReactNode
  visible?: boolean
  close?: () => void
}> = ({ children, visible = true, close }) => {
  const theme = useTheme()
  return create(Portal, {
    id: 'modals',
    children: create('div', {
      onClick: (event: any) =>
        event.target === event.currentTarget && close && close(),
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
        background: theme.modals.cover,
      }),
      children: create('div', {
        children,
        className: css({
          all: 'unset',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          width: theme.modals.width,
          height: theme.modals.height,
          background: theme.modals.background,
          boxShadow: theme.modals.shadow,
          border: theme.modals.border,
          fontSize: theme.global.fonts,
          borderRadius: theme.global.radius,
          [`@media (max-width: ${theme.modals.width + 30}), (max-height: ${theme
            .modals.height + 30})`]: {
            width: '100%',
            height: '100%',
            flexGrow: 1,
            borderRadius: 0,
          },
        }),
      }),
    }),
  })
}

const Portal: FC<{
  id: string
  children: ReactNode
}> = ({ id, children }) => {
  const [element, elementChange] = useState(document.getElementById(id))
  useEffect(() => {
    if (!element) {
      const createdElement = document.createElement('div')
      createdElement.id = id
      document.body.appendChild(createdElement)
      elementChange(createdElement)
    }
  }, [])
  return element ? createPortal(children, element) : null
}
