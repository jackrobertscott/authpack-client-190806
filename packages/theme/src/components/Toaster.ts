import {
  createElement as element,
  FC,
  ReactNode,
  useState,
  useMemo,
  Fragment,
  useRef,
} from 'react'
import { css } from 'emotion'
import { Icon } from './Icon'
import { useTheme } from '../hooks/useTheme'
import { ToasterArray, ToasterContext } from '../contexts/Toaster'
import { fadeup } from '../utils/animation'

export const Toaster: FC<{
  children: ReactNode
  initial?: ToasterArray
  width?: number
}> = ({ children, initial = [], width }) => {
  const set = useRef<ToasterArray>(initial)
  const [last, lastChange] = useState<number>(Date.now())
  const add = (options: {
    icon?: string
    prefix?: string
    label: string
    helper?: string
    timer?: number
  }) => {
    const id = Math.random()
      .toString(36)
      .substring(6)
    const { timer, ...toast } = options
    set.current = [...set.current, { ...toast, id, close: () => remove(id) }]
    lastChange(Date.now())
    setTimeout(() => remove(id), timer || toast.helper ? 8000 : 2000)
  }
  const remove = (id: string) => {
    set.current = set.current.filter((i: any) => i.id !== id)
    lastChange(Date.now())
  }
  const value = useMemo(() => {
    return {
      current: set.current,
      add,
      remove,
    }
  }, [last])
  return element(ToasterContext.Provider, {
    value,
    children: [
      element(Fragment, {
        key: 'children',
        children,
      }),
      element(ToasterAlerts, {
        key: 'toaster',
        current: set.current,
        width,
      }),
    ],
  })
}

export const ToasterAlerts: FC<{
  current: ToasterArray
  width?: number
}> = ({ current, width = 340 }) => {
  const theme = useTheme()
  const bp = `@media (max-width: ${525 + 50}px)`
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 1250,
      margin: '25px',
      [bp]: {
        left: 0,
        margin: '25px',
      },
    }),
    children: current.map(({ id, icon, prefix, label, helper, close }) => {
      return element('div', {
        key: id,
        className: css({
          all: 'unset',
          display: 'flex',
          alignItems: 'flex-start',
          overflow: 'hidden',
          padding: 15,
          marginTop: 15,
          width,
          borderRadius: theme.global.radius,
          boxShadow: theme.toaster.shadow,
          background: theme.toaster.background,
          border: theme.toaster.border,
          color: theme.toaster.label,
          animation: `${fadeup} 200ms linear`,
          [bp]: {
            width: 'auto',
            flexGrow: 1,
          },
        }),
        children: [
          element(Icon, {
            key: 'icon',
            icon: icon || 'bell',
            prefix,
          }),
          element('div', {
            key: 'text',
            className: css({
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              marginLeft: 10,
              marginRight: 10,
            }),
            children: [
              element('div', {
                key: 'label',
                children: label,
              }),
              helper &&
                element('div', {
                  key: 'helper',
                  children: helper,
                  className: css({
                    marginTop: 5,
                    fontWeight: theme.global.thin,
                    lineHeight: '1.5em',
                    color: theme.toaster.helper,
                  }),
                }),
            ],
          }),
          element('div', {
            key: 'close',
            onClick: close,
            className: css({
              all: 'unset',
              display: 'flex',
              cursor: 'pointer',
              transition: '200ms',
              padding: 5,
              margin: -5,
              borderRadius: theme.global.radius,
              '&:hover': {
                background: theme.toaster.backgroundHover,
              },
            }),
            children: element(Icon, {
              icon: 'times-circle',
              prefix: 'far',
            }),
          }),
        ],
      })
    }),
  })
}
