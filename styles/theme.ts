import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  text: {
    primary: '#111',
    secondary: '#0070f3',
    link: '#285ae6',
    liked: '#EB455F'
  },
  background: {
    primary: '#f6eade',
    secondary: 'white'
  },
  border: {
    primary: "#aaa",
    secondary: '#ccc'
  },
  buttons: {
    primaryBg: '#222831',
    secondaryBg: 'white',
    primaryText: 'white',
    primaryHoverBg: '#393E46',
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