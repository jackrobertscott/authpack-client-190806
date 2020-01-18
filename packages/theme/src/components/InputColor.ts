import { createElement as element, FC, useState, useEffect } from 'react'
import { css } from 'emotion'
import { InputContainer, InputPopover, InputOption } from './Input'
import { useTheme } from '../hooks/useTheme'

export const InputColor: FC<{
  value?: string
  change?: (value?: string) => void
}> = ({ value, change }) => {
  const theme = useTheme()
  const [open, openChange] = useState<boolean>(false)
  const [hsl, hslChange] = useState<{ h: number; s: number; l: number }>({
    h: 0,
    s: 0,
    l: 0,
  })
  useEffect(() => {
    if (change) change(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
  }, [hsl])
  return element(InputContainer, {
    nofocus: true,
    children: element('div', {
      onClick: () => openChange(true),
      className: css({
        all: 'unset',
        display: 'flex',
        cursor: 'pointer',
        flexGrow: 1,
        padding: 15,
      }),
      children: [
        element('div', {
          key: 'value',
          children: value,
          className: css({
            flexGrow: 1,
          }),
        }),
        open &&
          element(InputPopover, {
            key: 'popover',
            close: () => openChange(false),
            children: [
              element('div', {
                className: css({
                  all: 'unset',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 10,
                  flexGrow: 1,
                }),
                children: [...Array(3)].map((o, outer) => {
                  return element('div', {
                    key: outer,
                    className: css({
                      all: 'unset',
                      display: 'flex',
                      flexDirection: 'row',
                      cursor: 'pointer',
                      flexGrow: 1,
                      '&:not(:last-child)': {
                        marginBottom: 10,
                      },
                    }),
                    children: [...Array(10)].map((i, index) => {
                      return element('div', {
                        key: index,
                        className: css({
                          color: theme.input.label,
                          borderRadius: theme.global.radius,
                          background: theme.input.on,
                          padding: 10,
                          flexGrow: 1,
                          '&:not(:last-child)': {
                            marginRight: 10,
                          },
                        }),
                      })
                    }),
                  })
                }),
              }),
            ],
          }),
      ],
    }),
  })
}
