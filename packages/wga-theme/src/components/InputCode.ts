import { createElement as create, FC, useRef, useEffect } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import * as monaco from '../utils/monaco'
import '../utils/pretty'

export const InputCode: FC<{
  value: string
  change?: (value: string) => void
  language?: 'css' | 'html' | 'json' | 'typescript'
  height?: number
}> = ({ value = '', change, language, height = 300 }) => {
  const theme = useTheme()
  const element = useRef<undefined | HTMLElement>()
  const editor = useRef<undefined | monaco.editor.IStandaloneCodeEditor>()
  useEffect(() => {
    const resize = () => {
      if (editor.current) {
        editor.current.layout({ height: 0, width: 0 })
        editor.current.layout()
      }
    }
    window.addEventListener('resize', resize)
    setTimeout(() => resize) // push to next tick
    return () => window.removeEventListener('resize', resize)
  })
  useEffect(() => {
    if (element.current) {
      editor.current = monaco.editor.create(element.current, {
        value,
        language,
        theme: 'pretty',
        fontSize: theme.global.fonts - 2,
        minimap: {
          enabled: false,
        },
      })
      editor.current.onDidChangeModelContent(() => {
        if (editor.current && change) change(editor.current.getValue())
      })
    }
    return () => editor.current && editor.current.dispose()
  }, [])
  useEffect(() => {
    if (editor.current && editor.current.getValue() !== value) {
      editor.current.setValue(value)
    }
  }, [value])
  return create('div', {
    className: css({
      padding: '15px 0',
      background: '#272822',
      borderRadius: theme.global.radius,
    }),
    children: create('div', {
      ref: element,
      className: css({
        height,
      }),
    }),
  })
}
