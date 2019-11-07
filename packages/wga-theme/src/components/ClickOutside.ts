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
  disabled?: boolean
}> = ({ click, children, disabled }) => {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    if (disabled || !ref.current) return
    const handler = (event: MouseEvent) => {
      const node = findDOMNode(ref.current)
      const decendant =
        event.target instanceof HTMLElement &&
        node &&
        node.contains(event.target)
      console.log(decendant)
      if (!decendant) click()
    }
    document.addEventListener('mouseup', handler, false)
    return () => document.removeEventListener('mouseup', handler, false)
  }, [click, disabled])
  return create('div', {
    ref,
    children,
  })
}
