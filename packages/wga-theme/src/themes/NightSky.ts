import { ITheme } from '../contexts/Theme'

const slate = (
  lightness: number = 0,
  opacity: number = 1,
  saturation: number = 15
) => `hsla(200, ${saturation}%, ${lightness}%, ${opacity})`

export const NightSky: ITheme = {
  global: {
    radius: 3,
  },
  /**
   * Navigation.
   */
  iconBar: {
    icon: slate(65),
    iconHover: slate(95),
    iconFocused: slate(95),
    iconBackground: slate(5),
    iconBackgroundHover: slate(15),
    background: slate(5),
    border: `1px solid ${slate(2.5)}`,
  },
  sideBar: {
    title: slate(95),
    footer: slate(65),
    options: slate(65),
    optionsHover: slate(95),
    optionsFocused: slate(95),
    background: slate(7.5),
    backgroundHover: slate(12.5),
    border: `1px solid ${slate(2.5)}`,
  },
  pointer: {
    label: slate(95),
    helper: slate(65),
    background: slate(22.5),
    shadow: `0 0 13px -3px ${slate(0, 0.7)}`,
    border: `none`,
  },
  menu: {
    label: slate(95),
    helper: slate(65),
    background: slate(25),
    backgroundHover: slate(30),
    border: `none`,
  },
  /**
   * Screens.
   */
  page: {
    title: slate(95),
    subtitle: slate(65),
    branding: slate(35),
    brandingHover: slate(65),
    label: slate(65),
    labelHover: slate(95),
    header: slate(7.5),
    headerHover: slate(12.5),
    border: `1px solid ${slate(2.5)}`,
    background: slate(10),
  },
  gadgets: {
    title: slate(95),
    subtitle: slate(65),
    branding: slate(35),
    brandingHover: slate(65),
    header: slate(7.5),
    border: `none`,
    background: slate(10),
  },
  searchBar: {
    label: slate(65),
    labelHover: slate(95),
    labelDisabled: slate(35),
    placeholder: slate(35),
    background: slate(7.5),
    backgroundHover: slate(12.5),
    backgroundDisabled: slate(7.5),
    border: `1px solid ${slate(2.5)}`,
  },
  scroller: {
    background: slate(15),
    backgroundHover: slate(20),
    border: `1px solid ${slate(2.5)}`,
  },
  modal: {
    background: slate(0),
    shadow: slate(0),
    border: `none`,
    cover: slate(0),
  },
  /**
   * Lists.
   */
  table: {
    label: slate(95),
    value: slate(65),
    valueHover: slate(95),
    header: slate(10),
    headerHover: slate(15),
    background: slate(12.5),
    backgroundHover: slate(17.5),
    border: `1px solid ${slate(7.5)}`,
  },
  snippet: {
    label: slate(0),
    value: slate(0),
    arrow: slate(0),
    background: slate(0),
    backgroundHover: slate(0),
    border: `none`,
  },
  /**
   * Forms.
   */
  input: {
    label: slate(0),
    helper: slate(0),
    placeholder: slate(0),
    value: slate(0),
    valueHover: slate(0),
    background: slate(0),
    backgroundHover: slate(0),
    backgroundDisabled: slate(0),
    shadow: slate(0),
    border: `none`,
    on: slate(0),
    off: slate(0),
  },
  button: {
    label: slate(0),
    labelHover: slate(0),
    labelDisabled: slate(0),
    background: slate(0),
    backgroundMinor: slate(0),
    backgroundDisabled: slate(0),
    backgroundHover: slate(0),
    shadow: slate(0),
    border: `none`,
  },
  /**
   * Helpers.
   */
  poster: {
    label: slate(0),
    helper: slate(0),
    background: slate(0),
    border: `none`,
  },
  empty: {
    label: slate(0),
    helper: slate(0),
    background: slate(0),
    shadow: slate(0),
    border: `none`,
    cover: slate(0),
  },
  focus: {
    label: slate(0),
    helper: slate(0),
    background: slate(0),
  },
  toaster: {
    label: slate(0),
    helper: slate(0),
    background: slate(0),
    backgroundHover: slate(0),
    shadow: slate(0),
    border: `none`,
  },
}
