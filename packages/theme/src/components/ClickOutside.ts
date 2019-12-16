import {
  createElement as element,
  FC,
  useRef,
  ReactNode,
  useEffect,
} from 'react'
import { findDOMNode } from 'react-dom'
import { css } from 'emotion'

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
      if (!decendant) click()
    }
    document.addEventListener('mouseup', handler, false)
    return () => document.removeEventListener('mouseup', handler, false)
  }, [click, disabled])
  return element('div', {
    ref,
    children,
    className: css({
      flexGrow: 1,
    }),
  })
}
