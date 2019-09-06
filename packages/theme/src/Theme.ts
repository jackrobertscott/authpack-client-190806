import { createContext } from 'react'

export interface ITheme {
  global: {
    radius: string
    fonts: string
  }
  gadgets: {
    background: string
    border: string
    scrollbar: string
  }
  iconbar: {
    background: string
    color: string
    colorHover: string
  }
  sidebar: {
    background: string
    title: string
    color: string
    colorHover: string
  }
  inputs: {
    background: string
    backgroundHover: string
    border: string
    error: string
    color: string
    colorPrimary: string
    colorSecondary: string
  }
  buttons: {
    background: string
    border: string
    color: string
  }
  pointers: {
    background: string
    border: string
    color: string
  }
  headers: {
    background: string
    color: string
    brand: string
  }
  modals: {
    background: string
    height: string
    width: string
  }
}

export const Theme = createContext<ITheme>({
  global: {
    fonts: '15px',
    radius: '3px',
  },
  gadgets: {
    background: '#3B3B3B',
    border: '1px solid #222222',
    scrollbar: '#505050',
  },
  iconbar: {
    background: '#2C2C2C',
    color: '#777777',
    colorHover: '#999999',
  },
  sidebar: {
    background: '#383838',
    title: '#ADADAD',
    color: '#777777',
    colorHover: '#999999',
  },
  inputs: {
    background: '#272727',
    backgroundHover: '#292929',
    border: 'none',
    error: '#A62F27',
    color: '#FFFFFF',
    colorPrimary: '#B9B9B9',
    colorSecondary: '#656565',
  },
  buttons: {
    background: '#505050',
    border: 'none',
    color: '#FFFFFF',
  },
  pointers: {
    background: '#505050',
    border: 'none',
    color: '#FFFFFF',
  },
  headers: {
    background: '#333333',
    color: '#ADADAD',
    brand: '#777777',
  },
  modals: {
    background: 'hsla(0, 0%, 0%, 0.5)',
    height: '760px',
    width: '545px',
  },
})
