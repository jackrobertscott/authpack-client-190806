import { createContext, useContext } from 'react'
import { SnowStorm } from '../themes/SnowStorm'

interface IKeys {
  [key: string]: any
}

export interface ITheme extends IKeys {
  global: {
    radius: number
    thick: number
    thin: number
  }
  /**
   * Navigation.
   */
  iconBar: {
    icon: string
    iconHover: string
    iconFocused: string
    iconBackground: string
    iconBackgroundHover: string
    background: string
    border: string
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
  /**
   * Screens.
   */
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
  gadgets: {
    title: string
    subtitle: string
    branding: string
    brandingHover: string
    header: string
    border: string
    background: string
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
  scroller: {
    background: string
    backgroundHover: string
    underneath: string
    border: string
  }
  modal: {
    background: string
    shadow: string
    border: string
    cover: string
  }
  /**
   * Lists.
   */
  table: {
    label: string
    value: string
    valueHover: string
    header: string
    headerHover: string
    background: string
    backgroundHover: string
    border: string
  }
  snippet: {
    label: string
    value: string
    arrow: string
    background: string
    backgroundHover: string
    border: string
  }
  /**
   * Forms.
   */
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
    borderFocused: string
    on: string
    off: string
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
  /**
   * Helpers.
   */
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
  poster: {
    label: string
    helper: string
    background: string
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
  focus: {
    label: string
    helper: string
    background: string
  }
  toaster: {
    label: string
    helper: string
    background: string
    backgroundHover: string
    shadow: string
    border: string
  }
}

export const ThemeContext = createContext<ITheme>(SnowStorm)

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(ThemeContext)
  return Object.keys(theme).reduce((all, key) => {
    if (overrides[key]) all[key] = { ...theme[key], ...overrides[key] }
    return all
  }, theme)
}
