import {
  createElement as create,
  FC,
  ReactNode,
  useState,
  useMemo,
  Fragment,
} from 'react'
import { css } from 'emotion'
import { Icon } from './Icon'
import { useTheme } from '../hooks/useTheme'
import { ToasterArray, ToasterContext } from '../contexts/Toaster'

export const Toaster: FC<{
  children: ReactNode
  initial?: ToasterArray
  width?: number
}> = ({ children, initial = [], width }) => {
  const [current, setCurrent] = useState<ToasterArray>(initial)
  const add = (
    toast: {
      icon?: string
      prefix?: string
      label: string
      helper: string
    },
    timer: number = 5000
  ) => {
    const id = Math.random()
      .toString(36)
      .substring(6)
    setCurrent([...current, { ...toast, id, close: () => remove(id) }])
    setTimeout(() => remove(id), timer)
  }
  const remove = (id: string) => {
    setCurrent(current.filter((i: any) => i.id !== id))
  }
  const value = useMemo(() => {
    return {
      current,
      add,
      remove,
    }
  }, [current])
  return create(ToasterContext.Provider, {
    value,
    children: [
      create(Fragment, {
        key: 'children',
        children,
      }),
      create(ToasterAlerts, {
        key: 'toaster',
        current,
        width,
      }),
    ],
  })
}

export const ToasterAlerts: FC<{
  current: ToasterArray
  width?: number
}> = ({ current, width = 300 }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 1250,
      margin: '20px 50px 25px 25px',
    }),
    children: current.map(({ id, icon, prefix, label, helper, close }) => {
      return create('div', {
        key: id,
        className: css({
          all: 'unset',
          display: 'flex',
          alignItems: 'flex-start',
          overflow: 'hidden',
          padding: 15,
          marginTop: 15,
          borderRadius: theme.global.radius,
          width,
          boxShadow: theme.toaster.shadow,
          background: theme.toaster.background,
          border: theme.toaster.border,
          color: theme.toaster.label,
        }),
        children: [
          create(Icon, {
            key: 'icon',
            icon: icon || 'bell',
            prefix,
          }),
          create('div', {
            key: 'text',
            className: css({
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              marginLeft: 10,
              marginRight: 10,
            }),
            children: [
              create('div', {
                key: 'label',
                children: label,
              }),
              helper &&
                create('div', {
                  key: 'helper',
                  children: helper,
                  className: css({
                    marginTop: 5,
                    fontWeight: theme.global.thin,
                    color: theme.toaster.helper,
                  }),
                }),
            ],
          }),
          create('div', {
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
            children: create(Icon, {
              icon: 'times-circle',
              prefix: 'far',
            }),
          }),
        ],
      })
    }),
  })
}
