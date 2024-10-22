import { createContext } from 'react'

export interface ITheme {
  global: {
    radius: string
    fonts: string
  }
  gadgets: {
    background: string
    scrollbar: string
  }
  iconbar: {
    background: string
    color: string
    colorHover: string
    colorActive: string
  }
  sidebar: {
    background: string
    border: string
    title: string
    color: string
    colorHover: string
    colorActive: string
  }
  inputs: {
    background: string
    backgroundHover: string
    backgroundEnabled: string
    border: string
    error: string
    color: string
    colorPrimary: string
    colorSecondary: string
  }
  buttons: {
    background: string
    backgroundHover: string
    backgroundDisable: string
    cancel: string
    border: string
    color: string
    colorDisable: string
  }
  pointers: {
    background: string
    innerBackground: string
    border: string
    innerBorder: string
    color: string
    label: string
    description: string
  }
  headers: {
    background: string
    backgroundHover: string
    color: string
    brand: string
    button: string
    buttonHover: string
  }
  modals: {
    background: string
    inside: string
    border: string
    shadow: string
    height: string
    width: string
  }
  lists: {
    background: string
    backgroundHover: string
    border: string
    color: string
    label: string
  }
  search: {
    background: string
    color: string
    colorHover: string
  }
  posters: {
    background: string
    icon: string
    label: string
    description: string
  }
  toasters: {
    background: string
    icon: string
    label: string
    description: string
  }
}

export const Theme = createContext<ITheme>({
  global: {
    fonts: '15px',
    radius: '3px',
  },
  gadgets: {
    background: '#414141',
    scrollbar: '#505050',
  },
  iconbar: {
    background: '#2C2C2C',
    color: '#777777',
    colorHover: '#999999',
    colorActive: '#C4C4C4',
  },
  sidebar: {
    background: '#353535',
    border: '1px solid #313131',
    title: '#999999',
    color: '#777777',
    colorHover: '#999999',
    colorActive: '#B8B8B8',
  },
  inputs: {
    background: '#323232',
    backgroundHover: '#292929',
    backgroundEnabled: '#5C5C5C',
    border: 'none',
    error: '#CFCFCF',
    color: '#FFFFFF',
    colorPrimary: '#D5D5D5',
    colorSecondary: '#919191',
  },
  buttons: {
    background: '#595959',
    backgroundHover: '#777777',
    backgroundDisable: '#222222',
    cancel: '#323232',
    border: 'none',
    color: '#FFFFFF',
    colorDisable: '#444444',
  },
  pointers: {
    background: '#616161',
    innerBackground: '#696969',
    border: 'none',
    innerBorder: '1px solid #575757',
    color: '#FFFFFF',
    label: '#DBDBDB',
    description: '#A0A0A0',
  },
  headers: {
    background: '#3B3B3B',
    backgroundHover: '#4E4E4E',
    color: '#CCCCCC',
    brand: '#777777',
    button: '#777777',
    buttonHover: '#CCCCCC',
  },
  modals: {
    background: 'hsla(0, 0%, 0%, 0.75)',
    inside: '#333333',
    border: 'none',
    shadow: '0 0 35px -10px hsla(0, 0%, 0%, 0.75)',
    height: '760px',
    width: '545px',
  },
  lists: {
    background: '#4F4F4F',
    backgroundHover: '#585858',
    border: '1px solid #494949',
    color: '#FFFFFF',
    label: '#999999',
  },
  search: {
    background: '#434343',
    color: '#6F6F6F',
    colorHover: '#CCCCCC',
  },
  posters: {
    background: '#2C2C2C',
    icon: '#FFFFFF',
    label: '#FFFFFF',
    description: '#BABABA',
  },
  toasters: {
    background: '#2C2C2C',
    icon: '#FFFFFF',
    label: '#FFFFFF',
    description: '#BABABA',
  },
})
