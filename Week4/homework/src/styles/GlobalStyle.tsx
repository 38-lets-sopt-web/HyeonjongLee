import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background-color: #f5f8ff;
        color: #1a1a1a;
        -webkit-font-smoothing: antialiased;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        cursor: pointer;
        border: none;
        background: none;
        font: inherit;
      }

      input {
        outline: none;
        font: inherit;
      }
    `}
  />
);

export default GlobalStyle;
