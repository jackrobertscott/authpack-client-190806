import {
  createElement as create,
  FC,
  useRef,
  ReactNode,
  useEffect,
} from 'react'
import { findDOMNode } from 'react-dom'

export const ClickOutside: FC<{
  click: () => void
  children: ReactNode
}> = ({ click, children }) => {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      const node = findDOMNode(ref.current)
      const decendant =
        target instanceof HTMLElement && node && node.contains(target)
      if (!decendant) click()
    }
    document.addEventListener('mouseup', handler, false)
    return () => document.removeEventListener('mouseup', handler, false)
  }, [])
  return create('div', {
    ref,
    children,
  })
}
