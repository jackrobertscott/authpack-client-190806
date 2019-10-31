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
  width?: number
  height?: number
}> = ({ children, visible = true, close, width = 890, height = 550 }) => {
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
        background: theme.modal.cover,
      }),
      children: create('div', {
        children,
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
          fontSize: theme.global.fonts,
          borderRadius: theme.global.radius,
          [`@media (max-width: ${width + 50}px), (max-height: ${height +
            50}px)`]: {
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
