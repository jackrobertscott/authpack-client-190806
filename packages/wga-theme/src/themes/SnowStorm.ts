import { ITheme } from '../contexts/Theme'

const slate = (
  lightness: number = 0,
  opacity: number = 1,
  saturation: number = 15,
  hue: number = 200
) =>
  opacity === 1
    ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
    : `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`

export const SnowStorm: ITheme = {
  global: {
    radius: 3,
    thick: 800,
    thin: 600,
  },
  /**
   * Navigation.
   */
  iconBar: {
    icon: slate(60),
    iconHover: slate(30),
    iconFocused: slate(30),
    iconBackground: slate(92.5),
    iconBackgroundHover: slate(97.5),
    background: slate(92.5),
    border: `1px solid ${slate(85)}`,
  },
  sideBar: {
    title: slate(30),
    footer: slate(60),
    options: slate(60),
    optionsHover: slate(30),
    optionsFocused: slate(30),
    background: slate(95),
    backgroundHover: slate(97.5),
    border: `1px solid ${slate(90)}`,
  },
  /**
   * Screens.
   */
  page: {
    title: slate(30),
    subtitle: slate(60),
    branding: slate(80),
    brandingHover: slate(60),
    label: slate(60),
    labelHover: slate(30),
    header: slate(95),
    headerHover: slate(97.5),
    border: `1px solid ${slate(90)}`,
    background: slate(97.5),
  },
  gadgets: {
    title: slate(30),
    subtitle: slate(60),
    branding: slate(80),
    brandingHover: slate(60),
    header: slate(95),
    border: `1px solid ${slate(90)}`,
    background: slate(97.5),
  },
  searchBar: {
    label: slate(60),
    labelHover: slate(30),
    labelDisabled: slate(75),
    placeholder: slate(75),
    background: slate(95),
    backgroundHover: slate(97.5),
    backgroundDisabled: slate(95),
    border: `1px solid ${slate(90)}`,
  },
  scroller: {
    background: slate(92.5),
    backgroundHover: slate(90),
    underneath: slate(97.5),
    border: `1px solid ${slate(87.5)}`,
  },
  modal: {
    background: slate(90),
    shadow: `0 0 13px -3px ${slate(25, 0.25)}`,
    border: `1px solid ${slate(65)}`,
    cover: slate(5, 0.25),
  },
  /**
   * Lists.
   */
  table: {
    label: slate(30),
    value: slate(50),
    valueHover: slate(30),
    header: slate(95),
    headerHover: slate(97.5),
    background: slate(100),
    backgroundHover: slate(97.5),
    border: `1px solid ${slate(92.5)}`,
  },
  snippet: {
    label: slate(30),
    value: slate(50),
    arrow: slate(50),
    background: slate(100),
    backgroundHover: slate(97.5),
    border: `1px solid ${slate(92.5)}`,
  },
  /**
   * Forms.
   */
  input: {
    label: slate(30),
    helper: slate(60),
    placeholder: slate(60),
    value: slate(50),
    valueHover: slate(30),
    background: slate(100),
    backgroundHover: slate(100),
    backgroundDisabled: slate(95),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(92.5)}`,
    borderFocused: `1px solid ${slate(60)}`,
    on: slate(65, 1, 80, 130),
    off: slate(87.5),
  },
  button: {
    label: slate(60),
    labelHover: slate(30),
    labelDisabled: slate(80),
    background: slate(100),
    backgroundMinor: slate(97.5),
    backgroundDisabled: slate(95),
    backgroundHover: slate(100),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(92.5)}`,
  },
  /**
   * Helpers.
   */
  pointer: {
    label: slate(30),
    helper: slate(60),
    background: slate(100),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(87.5)}`,
  },
  menu: {
    label: slate(30),
    helper: slate(60),
    background: slate(100),
    backgroundHover: slate(97.5),
    border: `1px solid ${slate(92.5)}`,
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
  },
  poster: {
    label: slate(30),
    helper: slate(60),
    background: slate(97.5),
    border: `1px solid ${slate(92.5)}`,
  },
  empty: {
    label: slate(30),
    helper: slate(60),
    background: slate(97.5),
    shadow: `0 0 13px -3px ${slate(80, 0.5)}`,
    border: `1px solid ${slate(87.5)}`,
    cover: slate(100, 0.75),
  },
  focus: {
    label: slate(30),
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
