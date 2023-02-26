import 'styled-components';

declare module 'styled-components' {
  // extending the DefaultTheme interface to my theme
  export interface DefaultTheme {
    text: {
      primary: string;
      secondary: string;
      link: string;
      liked: string;
    },
    border: {
      primary: string;
      secondary: string;
    }
    background: {
      primary: string;
      secondary: string;
    },
    button: {
      primaryBg: string;
      primaryText: string;
      primaryHoverBg: string;
      secondaryBg: string;
      secondaryText: string;
      secondaryHoverBg: string;
    },
    tag: {
      bg: string;
      border: string;
    }
  }
}