import { createElement as create, FC, ReactNode } from 'react'
import { ITheme, ThemeContext } from '../contexts/Theme'

export const Theme: FC<{
  value: ITheme
  children: ReactNode
}> = ({ value, children }) => {
  return create(ThemeContext.Provider, {
    value,
    children,
  })
}
