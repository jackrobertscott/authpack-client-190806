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
  const [show, changeShow] = useState(children)
  useEffect(() => {
    if (!visible) setTimeout(() => changeShow(children), 200)
    else changeShow(children)
  }, [visible])
  const portal = usePortal({ id: 'portals' })
  const modal = create(Modal.Container, {
    click: close,
    children: show,
    visible,
  })
  return portal.element ? createPortal(modal, portal.element) : null
}
