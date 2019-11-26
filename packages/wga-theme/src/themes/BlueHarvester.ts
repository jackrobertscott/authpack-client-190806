import { ITheme } from '../contexts/Theme'

const color = (
  index: number = 0,
  alpha: number = 1,
  red: number = 255,
  green: number = 127.5,
  blue: number = 8
) => {
  const multiplier = index / 100
  return `rgba(${multiplier * red}, ${multiplier * green}, ${multiplier *
    blue}, ${alpha})`
}

export const BlueHarvester: ITheme = {
  global: {
    radius: 3,
    thick: 500,
    thin: 400,
  },
  /**
   * Navigation.
   */
  iconBar: {
    icon: color(65),
    iconHover: color(95),
    iconFocused: color(95),
    iconBackground: color(10),
    iconBackgroundHover: color(20),
    background: color(10),
    border: `1px solid ${color(7.5)}`,
  },
  sideBar: {
    title: color(95),
    footer: color(65),
    options: color(65),
    optionsHover: color(95),
    optionsFocused: color(95),
    background: color(12.5),
    backgroundHover: color(15),
    backgroundFocused: color(10),
    border: `1px solid ${color(7.5)}`,
  },
  /**
   * Screens.
   */
  page: {
    title: color(95),
    subtitle: color(65),
    branding: color(35),
    brandingHover: color(65),
    label: color(65),
    labelHover: color(95),
    header: color(15),
    headerHover: color(20),
    border: `1px solid ${color(12.5)}`,
    background: color(15),
  },
  gadgets: {
    title: color(95),
    subtitle: color(65),
    branding: color(35),
    brandingHover: color(65),
    header: color(12.5),
    border: `1px solid ${color(7.5)}`,
    background: color(15),
  },
  layout: {
    background: color(17.5),
    border: `1px solid ${color(10)}`,
  },
  searchBar: {
    label: color(65),
    labelHover: color(95),
    labelDisabled: color(35),
    placeholder: color(35),
    background: color(12.5),
    backgroundHover: color(17.5),
    backgroundDisabled: color(12.5),
    border: `1px solid ${color(7.5)}`,
  },
  scroller: {
    background: color(17.5),
    backgroundHover: color(22.5),
    underneath: color(12.5),
    border: `1px solid ${color(10)}`,
  },
  modal: {
    background: color(10),
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
    border: `1px solid ${color(7.5)}`,
    cover: color(10, 0.25),
  },
  /**
   * Lists.
   */
  table: {
    label: color(95),
    value: color(65),
    valueHover: color(95),
    header: color(15),
    headerHover: color(20),
    background: color(17.5),
    backgroundHover: color(22.5),
    border: `1px solid ${color(12.5)}`,
  },
  snippet: {
    label: color(95),
    value: color(65),
    arrow: color(65),
    background: color(17.5),
    backgroundHover: color(22.5),
    border: `1px solid ${color(15)}`,
  },
  /**
   * Forms.
   */
  input: {
    label: color(95),
    helper: color(45),
    placeholder: color(35),
    value: color(65),
    valueHover: color(95),
    background: color(17.5),
    backgroundHover: color(22.5),
    backgroundDisabled: color(15),
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
    border: `1px solid ${color(10)}`,
    borderFocused: `1px solid ${color(55)}`,
    on: color(32.5),
    off: color(12.5),
    payment: '#ffffff',
  },
  button: {
    label: color(65),
    labelHover: color(95),
    labelDisabled: color(35),
    background: color(22.5),
    backgroundMinor: color(20),
    backgroundDisabled: color(12.5),
    backgroundHover: color(27.5),
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
    border: `1px solid ${color(10)}`,
  },
  /**
   * Helpers.
   */
  pointer: {
    label: color(95),
    helper: color(65),
    background: color(27.5),
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
    border: `none`,
  },
  menu: {
    label: color(95),
    helper: color(65),
    background: color(17.5),
    backgroundHover: color(22.5),
    border: `1px solid ${color(12.5)}`,
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
  },
  poster: {
    label: color(95),
    helper: color(65),
    background: color(17.5),
    border: `1px solid ${color(12.5)}`,
  },
  empty: {
    label: color(95),
    helper: color(65),
    background: color(20),
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
    border: `1px solid ${color(12.5)}`,
    cover: color(15, 0.75),
  },
  focus: {
    label: color(95),
    helper: color(65),
    background: color(15),
  },
  toaster: {
    label: color(95),
    helper: color(65),
    background: color(17.5),
    backgroundHover: color(22.5),
    shadow: `0 0 13px -3px ${color(5, 0.5)}`,
    border: `1px solid ${color(55)}`,
  },
}
