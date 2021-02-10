import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;
    background: #f2f2f2 0% 0% no-repeat padding-box;
  }

  p {
    margin: 0
  }

  .pointer {
    cursor: pointer;
  }
`;

export default GlobalStyle;
