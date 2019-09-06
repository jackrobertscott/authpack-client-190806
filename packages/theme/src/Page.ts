import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IPageRouter {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export interface IPage {
  Container: FC<{
    children: ReactNode
  }>
}

export const Page: IPage = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'flex-start',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: 'yellow',
      }),
    })
  },
}
