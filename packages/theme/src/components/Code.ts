import { createElement as element, FC, useRef } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { useToaster } from '../hooks/useToaster'

export const Code: FC<{ value: string }> = ({ value }) => {
  const theme = useTheme()
  const snippet = useRef<HTMLDivElement>()
  const toaster = useToaster()
  return element('div', {
    onClick: () => {
      if (snippet.current) {
        const range = document.createRange()
        range.selectNode(snippet.current)
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(range)
          document.execCommand('copy')
          selection.removeAllRanges()
          toaster.add({ icon: 'copy', label: 'Copied to Clipboard' })
        }
      }
    },
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      transition: '200ms',
      overflow: 'hidden',
      cursor: 'pointer',
      flexGrow: 1,
      borderRadius: theme.global.radius,
      background: theme.input.background,
      border: theme.input.border,
      color: theme.input.value,
      '&:hover': {
        background: theme.input.backgroundHover,
        boxShadow: theme.input.shadow,
        color: theme.input.valueHover,
      },
    }),
    children: [
      element('div', {
        key: 'code',
        children: value,
        ref: snippet,
        className: css({
          all: 'unset',
          width: '100%',
          fontFamily: 'Inconsolata',
          whiteSpace: 'pre-wrap',
          padding: 15,
        }),
      }),
      element('div', {
        key: 'hint',
        children: element(Icon, {
          icon: 'copy',
        }),
        className: css({
          all: 'unset',
          position: 'absolute',
          right: 15,
          top: 15,
          padding: 15,
          border: theme.input.border,
          borderRadius: theme.global.radius,
          background: theme.input.backgroundHover,
          color: theme.input.valueHover,
        }),
      }),
    ],
  })
}
