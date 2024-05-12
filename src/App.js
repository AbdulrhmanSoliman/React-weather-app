import "./App.css";
import Content from "./Content";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
  palette: {
    primary: {
      main: lightBlue[600],
    },
    secondary: {
      main: lightBlue[50],
    },
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </div>
  );
}

export default App;
