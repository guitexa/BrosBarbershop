import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   outline: 0;
  }

  body {
    background-color: #000;
    color: #f2f2f2;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Teko, serif;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }

  h1, h1, h3, h4, h5, h6, strong, b {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
