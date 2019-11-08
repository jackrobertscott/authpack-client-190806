import { createContext, useContext } from 'react'
import { IronMaiden } from '../themes/IronMaiden'

interface IKeys {
  [key: string]: any
}

export interface ITheme extends IKeys {
  global: {
    radius: number
  }
  button: {
    label: string
    labelHover: string
    labelDisabled: string
    background: string
    backgroundMinor: string
    backgroundDisabled: string
    backgroundHover: string
    shadow: string
    border: string
  }
  input: {
    label: string
    helper: string
    placeholder: string
    value: string
    valueHover: string
    background: string
    backgroundHover: string
    backgroundDisabled: string
    shadow: string
    border: string
    on: string
    off: string
  }
  gadgets: {
    title: string
    subtitle: string
    branding: string
    brandingHover: string
    header: string
    border: string
    background: string
  }
  page: {
    title: string
    subtitle: string
    branding: string
    brandingHover: string
    label: string
    labelHover: string
    header: string
    headerHover: string
    border: string
    background: string
  }
  scroller: {
    background: string
    backgroundHover: string
  }
  sideBar: {
    title: string
    footer: string
    options: string
    optionsHover: string
    optionsFocused: string
    background: string
    backgroundHover: string
    border: string
  }
  searchBar: {
    label: string
    labelHover: string
    labelDisabled: string
    placeholder: string
    background: string
    backgroundHover: string
    backgroundDisabled: string
    border: string
  }
  iconBar: {
    icon: string
    iconHover: string
    iconFocused: string
    iconBackground: string
    iconBackgroundHover: string
    background: string
    border: string
  }
  pointer: {
    label: string
    helper: string
    background: string
    shadow: string
    border: string
  }
  menu: {
    label: string
    helper: string
    background: string
    backgroundHover: string
    border: string
  }
  modal: {
    background: string
    shadow: string
    border: string
    cover: string
  }
  snippet: {
    label: string
    value: string
    arrow: string
    background: string
    backgroundHover: string
    border: string
  }
  table: {
    label: string
    value: string
    header: string
    headerHover: string
    background: string
    backgroundHover: string
    border: string
  }
  empty: {
    label: string
    helper: string
    background: string
    shadow: string
    border: string
    cover: string
  }
  toaster: {
    label: string
    helper: string
    background: string
    backgroundHover: string
    shadow: string
    border: string
  }
  poster: {
    label: string
    helper: string
    background: string
    border: string
  }
  focus: {
    label: string
    helper: string
    background: string
  }
}

export const Theme = createContext<ITheme>(IronMaiden)

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(Theme)
  return Object.keys(theme).reduce((all, key) => {
    if (overrides[key]) all[key] = { ...theme[key], ...overrides[key] }
    return all
  }, theme)
}
