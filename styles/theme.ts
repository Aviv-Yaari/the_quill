import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  text: {
    primary: '#111',
    secondary: '#aaa',
    link: '#285ae6',
    liked: '#EB455F'
  },
  background: {
    primary: '#f6eade',
    secondary: '#fdf7f1'
  },
  border: {
    primary: "#aaa",
    secondary: '#ccc'
  },
  button: {
    primaryBg: '#2B3A55',
    secondaryBg: 'white',
    primaryText: 'white',
    primaryHoverBg: '#181D31',
    secondaryText: '#111',
    secondaryHoverBg: '#eee'
  },
  tag: {
    bg: '#fbfbfb',
    border: "#d9d9d9"
  }
};

export const breakpoints = {
  mobileBreakpoint: '480px',
  tabletBreakpoint: '768px',
  desktopBreakpoint: '1024px',
  largeDesktopBreakpoint: '1440px'
};

export default theme;