import { createContext, useContext } from 'react'

interface IKeys {
  [key: string]: any
}

export interface ITheme extends IKeys {
  global: {
    radius: number
    fonts: number
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
    scrollbar: string
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
    scrollbar: string
  }
  sideBar: {
    title: string
    footer: string
    options: string
    optionsHover: string
    optionsFocused: string
    background: string
    border: string
  }
  searchBar: {
    label: string
    labelHover: string
    labelDisabled: string
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
    width: number
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

export const Theme = createContext<ITheme>({
  global: {
    fonts: 15,
    radius: 3,
  },
  button: {
    label: '#FFFFFF',
    labelHover: '#FFFFFF',
    labelDisabled: '#444444',
    background: '#595959',
    backgroundMinor: '#4E4E4E',
    backgroundDisabled: '#222222',
    backgroundHover: '#777777',
    shadow: '0 1px 10px -3px rgba(0, 0, 0, 0.15)',
    border: 'none',
  },
  input: {
    label: '#FFFFFF',
    helper: '#B1B1B1',
    placeholder: '#555555',
    value: '#999999',
    valueHover: '#FFFFFF',
    background: '#323232',
    backgroundHover: '#292929',
    backgroundDisabled: '#2C2C2C',
    shadow: '0 1px 10px -3px rgba(0, 0, 0, 0.15)',
    border: 'none',
    on: '#3c933a',
    off: '#515151',
  },
  gadgets: {
    title: '#CCCCCC',
    subtitle: '#777777',
    branding: '#777777',
    brandingHover: '#EEEEEE',
    header: '#3B3B3B',
    border: 'none',
    background: '#414141',
    scrollbar: '#505050',
  },
  page: {
    title: '#CCCCCC',
    subtitle: '#777777',
    branding: '#595959',
    brandingHover: '#999999',
    label: '#777777',
    labelHover: '#EEEEEE',
    header: '#3B3B3B',
    headerHover: '#454545',
    border: 'none',
    background: '#414141',
    scrollbar: '#505050',
  },
  sideBar: {
    title: '#999999',
    footer: '#414141',
    options: '#777777',
    optionsHover: '#999999',
    optionsFocused: '#B8B8B8',
    background: '#353535',
    border: 'none',
  },
  searchBar: {
    label: '#777777',
    labelHover: '#FFFFFF',
    labelDisabled: '#555555',
    background: '#4F4F4F',
    backgroundHover: '#585858',
    backgroundDisabled: '#333333',
    border: '1px solid #454545',
  },
  iconBar: {
    icon: '#777777',
    iconHover: '#999999',
    iconFocused: '#C4C4C4',
    iconBackground: 'transparent',
    iconBackgroundHover: '#191919',
    background: '#2C2C2C',
    border: 'none',
  },
  pointer: {
    width: 280,
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#777777',
    shadow: '0 0 25px -5px rgba(0, 0, 0, 0.35)',
    border: 'none',
  },
  menu: {
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#777777',
    backgroundHover: '#888888',
    border: 'none',
  },
  modal: {
    background: '#111111',
    shadow: '0 0 25px -5px rgba(0, 0, 0, 0.35)',
    border: 'none',
    cover: 'rgba(0, 0, 0, 0.45)',
  },
  snippet: {
    label: '#FFFFFF',
    value: '#CCCCCC',
    arrow: '#888888',
    background: '#494949',
    backgroundHover: '#595959',
    border: '1px solid #454545',
  },
  table: {
    label: '#CCCCCC',
    value: '#FFFFFF',
    header: '#4A4A4A',
    headerHover: '#585858',
    background: '#4F4F4F',
    backgroundHover: '#585858',
    border: '1px solid #454545',
  },
  empty: {
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#4A4A4A',
    shadow: '0 0 55px -5px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cover:
      'linear-gradient(to top, hsla(0, 0%, 22%, 1),hsla(0, 0%, 24%, 1) 50%, hsla(0, 0%, 26%, 0.7))',
  },
  toaster: {
    label: '#EEEEEE',
    helper: '#999999',
    background: '#2C2C2C',
    backgroundHover: '#333333',
    shadow: '0 0 55px -5px rgba(0, 0, 0, 0.35)',
    border: 'none',
  },
  poster: {
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#595959',
    border: 'none',
  },
  focus: {
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#494949',
  },
})

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(Theme)
  return Object.keys(theme).reduce((all, key) => {
    if (overrides[key]) all[key] = { ...theme[key], ...overrides[key] }
    return all
  }, theme)
}
