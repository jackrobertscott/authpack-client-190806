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
  gadgets: {
    title: string
    subtitle: string
    branding: string
    header: string
    border: string
    background: string
    scrollbar: string
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
    label: '#FFFFFF',
    helper: '#D5D5D5',
    background: '#323232',
    backgroundHover: '#292929',
    backgroundFocused: '#5C5C5C',
    border: 'none',
  },
  gadgets: {
    title: '#CCCCCC',
    subtitle: '#777777',
    branding: '#777777',
    header: '#3B3B3B',
    border: 'none',
    background: '#414141',
    scrollbar: '#505050',
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
