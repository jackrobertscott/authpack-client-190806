import { createElement as element, FC, useEffect, useState } from 'react'
import { css } from 'emotion'
import * as marked from 'marked'
import { useTheme } from '../hooks/useTheme'

export const Markdown: FC<{ value: string }> = ({ value = '' }) => {
  const theme = useTheme()
  const [render, renderChange] = useState<{ __html: string }>({ __html: '' })
  useEffect(() => {
    const renderer = new marked.Renderer()
    renderer.link = function(href, title, text) {
      const link = marked.Renderer.prototype.link.call(this, href, title, text)
      return link.replace('<a', "<a target='_blank' ")
    }
    renderChange({
      __html: marked(value, {
        sanitize: true,
        renderer,
      }),
    })
  }, [value])
  return element('div', {
    dangerouslySetInnerHTML: render,
    className: css({
      a: {
        color: 'inherit',
      },
      p: {
        fontWeight: theme.global.thin,
      },
      code: {
        padding: '2px 3px',
        background: theme.layout.background,
        fontSize: '0.9em',
        borderRadius: 3,
      },
      '& > *': {
        margin: '0 0 15px 0',
        lineHeight: '1.5em',
        '&:last-child': {
          margin: '0',
        },
      },
    }),
  })
}
