import { createContext, useContext } from 'react'

interface IKeys {
  [key: string]: any
}

export interface ITheme extends IKeys {
  global: {
    radius: number
    fonts: number
  }
  buttons: {
    label: string
    labelHover: string
    labelDisabled: string
    background: string
    backgroundMinor: string
    backgroundDisabled: string
    backgroundHover: string
    border: string
  }
  inputs: {
    label: string
    helper: string
    background: string
    backgroundHover: string
    backgroundFocused: string
    border: string
  }
}

export const Theme = createContext<ITheme>({
  global: {
    fonts: 15,
    radius: 3,
  },
  buttons: {
    label: '#FFFFFF',
    labelHover: '#FFFFFF',
    labelDisabled: '#444444',
    background: '#595959',
    backgroundMinor: '#494949',
    backgroundDisabled: '#222222',
    backgroundHover: '#777777',
    border: 'none',
  },
  inputs: {
    label: '',
    helper: '',
    background: '',
    backgroundHover: '',
    backgroundFocused: '',
    border: '',
  },
})

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(Theme)
  return Object.keys(theme).reduce(
    (all, key) => {
      all[key] = !overrides[key]
        ? { ...theme[key], ...overrides[key] }
        : theme[key]
      return all
    },
    {} as any
  )
}
