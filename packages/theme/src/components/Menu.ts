import { createElement as element, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { Scroller } from './Scroller'

export const Menu: FC<{
  isolated?: boolean
  options: Array<{
    label: string
    helper?: string
    icon: string
    prefix?: string
    click?: () => void
  }>
}> = ({ isolated, options }) => {
  const theme = useTheme()
  return element('div', {
    className: css({
      overflow: 'hidden',
      borderRadius: isolated ? theme.global.radius : undefined,
      border: isolated ? theme.menu.border : undefined,
      boxShadow: isolated ? theme.menu.shadow : undefined,
      borderTop: theme.menu.border,
    }),
    children: element(Scroller, {
      maxheight: 320,
      borderleft: true,
      children: options.map(({ label, helper, icon, prefix, click }) => {
        return element('div', {
          key: label,
          onClick: click,
          className: css({
            all: 'unset',
            display: 'flex',
            transition: '200ms',
            cursor: 'pointer',
            padding: 15,
            flexGrow: 1,
            color: theme.menu.label,
            background: theme.menu.background,
            '&:not(:last-child)': {
              borderBottom: theme.menu.border,
            },
            '&:hover:not(:active)': {
              background: theme.menu.backgroundHover,
            },
          }),
          children: [
            element(Icon, {
              key: 'icon',
              icon,
              prefix,
            }),
            element('div', {
              key: 'text',
              className: css({
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                marginLeft: 10,
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
                      color: theme.menu.helper,
                    }),
                  }),
              ],
            }),
          ],
        })
      }),
    }),
  })
}
