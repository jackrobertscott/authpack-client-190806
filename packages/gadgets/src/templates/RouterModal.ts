import {
  createElement as create,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'wga-theme'
import { usePortal } from '../hooks/usePortal'

export type IRouterModal = {
  children: ReactNode
  close?: () => void
  visible: boolean
}

export const RouterModal: FC<IRouterModal> = ({
  children,
  close,
  visible = true,
}) => {
  // dumb hack to prevent flicker in modal transitions
  const [screen, changeScreen] = useState(children)
  useEffect(() => {
    if (!visible) setTimeout(() => changeScreen(children), 200)
    else changeScreen(children)
    // eslint-disable-next-line
  }, [visible, children])
  const portal = usePortal({ id: 'portals' })
  const modal = create(Modal.Container, {
    click: close,
    children: screen,
    visible,
  })
  return portal.element ? createPortal(modal, portal.element) : null
}
