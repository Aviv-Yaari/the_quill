import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Lora } from '@next/font/google'

const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    color: ${({ theme }) => theme.text.primary};
    background: ${({ theme }) => theme.background.primary};
    line-height: 2;
    ${lora.style}
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

  button {
    border: none;
    background: inherit;
    padding: 0;
    font-family: inherit;
    font-size: 1em;
    cursor: pointer;
  }

  a {
    color: ${({ theme }) => theme.text.link};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  li, p {
    line-height: 1.75;
  }

`

export default GlobalStyle