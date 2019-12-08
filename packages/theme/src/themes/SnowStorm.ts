import { ITheme } from '../contexts/Theme'

const slate = (
  lightness: number = 0,
  opacity: number = 1,
  saturation: number = 10,
  hue: number = 210
) =>
  opacity === 1
    ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
    : `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`

export const SnowStorm: ITheme = {
  global: {
    radius: 3,
    thick: 500,
    thin: 500,
  },
  /**
   * Navigation.
   */
  iconBar: {
    icon: slate(60),
    iconHover: slate(25),
    iconFocused: slate(25),
    iconBackground: slate(92, 5),
    iconBackgroundHover: slate(97.5),
    background: slate(92.5),
    border: `1px solid ${slate(87.5)}`,
  },
  sideBar: {
    title: slate(25),
    footer: slate(60),
    options: slate(60),
    optionsHover: slate(25),
    optionsFocused: slate(25),
    background: slate(92.5),
    backgroundHover: slate(97.5),
    backgroundFocused: slate(90),
    border: `1px solid ${slate(87.5)}`,
  },
  /**
   * Screens.
   */
  page: {
    title: slate(25),
    subtitle: slate(60),
    branding: slate(80),
    brandingHover: slate(60),
    label: slate(60),
    labelHover: slate(25),
    header: slate(95),
    headerHover: slate(100),
    border: `1px solid ${slate(90)}`,
    background: slate(95),
  },
  layout: {
    background: slate(97.5),
    border: `1px solid ${slate(92.5)}`,
  },
  searchBar: {
    label: slate(60),
    labelHover: slate(25),
    labelDisabled: slate(75),
    placeholder: slate(75),
    background: slate(92.5),
    backgroundHover: slate(97.5),
    backgroundDisabled: slate(92.5),
    border: `1px solid ${slate(90)}`,
  },
  scroller: {
    background: slate(97.5),
    backgroundHover: slate(100),
    underneath: slate(90),
    border: `1px solid ${slate(87.5)}`,
  },
  modal: {
    background: slate(87.5),
    shadow: `0 0 13px -3px ${slate(25, 0.25)}`,
    border: `1px solid ${slate(50)}`,
    cover: slate(15, 0.5),
  },
  /**
   * Lists.
   */
  table: {
    label: slate(25),
    value: slate(40),
    valueHover: slate(25),
    header: slate(92.5),
    headerHover: slate(97.5),
    background: slate(97.5),
    backgroundHover: slate(100),
    border: `1px solid ${slate(90)}`,
  },
  snippet: {
    label: slate(25),
    value: slate(40),
    arrow: slate(40),
    background: slate(97.5),
    backgroundHover: slate(100),
    border: `1px solid ${slate(90)}`,
  },
  /**
   * Forms.
   */
  input: {
    label: slate(25),
    helper: slate(60),
    placeholder: slate(60),
    value: slate(50),
    valueHover: slate(25),
    background: slate(97.5),
    backgroundHover: slate(100),
    backgroundDisabled: slate(95),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(90)}`,
    borderFocused: `1px solid ${slate(60)}`,
    on: slate(65, 1, 80, 125),
    off: slate(87.5),
    payment: '#333333',
  },
  button: {
    label: slate(60),
    labelHover: slate(25),
    labelDisabled: slate(75),
    background: slate(100),
    backgroundMinor: slate(97.5),
    backgroundDisabled: slate(92.5),
    backgroundHover: slate(100),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(90)}`,
  },
  /**
   * Helpers.
   */
  pointer: {
    label: slate(25),
    helper: slate(60),
    background: slate(100),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(87.5)}`,
  },
  menu: {
    label: slate(25),
    helper: slate(60),
    background: slate(100),
    backgroundHover: slate(97.5),
    border: `1px solid ${slate(87.5)}`,
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
  },
  poster: {
    label: slate(25),
    helper: slate(60),
    background: slate(97.5),
    border: `1px solid ${slate(90)}`,
  },
  empty: {
    label: slate(25),
    helper: slate(60),
    background: slate(100),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(87.5)}`,
    cover: slate(97.5, 0.75),
  },
  focus: {
    label: slate(25),
    helper: slate(60),
    background: slate(97.5),
  },
  toaster: {
    label: slate(95),
    helper: slate(80),
    background: slate(50),
    backgroundHover: slate(35),
    shadow: `0 0 13px -3px ${slate(25, 0.25)}`,
    border: `none`,
  },
}
