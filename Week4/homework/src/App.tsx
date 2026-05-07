import { ThemeProvider } from "@emotion/react";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
