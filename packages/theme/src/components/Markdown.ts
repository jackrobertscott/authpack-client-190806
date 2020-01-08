import { createElement as element, FC, useEffect, useState } from 'react'
import { css } from 'emotion'
import * as marked from 'marked'

export const Markdown: FC<{ value: string }> = ({ value = '' }) => {
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
