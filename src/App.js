import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, pink, grey, green, yellow } from "@mui/material/colors";
import { Navbar } from "./components/Navbar";
import { NewDiary } from "./pages/NewDiary";
import { Diarys } from "./pages/Diarys";
import { Dashboard } from "./pages/Dashboard";
import { Wallet } from "./pages/Wallet";
import { Login } from "./pages/Login";
import styled from "styled-components";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
    },
    secondary: {
      main: blue[400],
    },
    text: {
      primary: pink[400],
      light: pink[50],
    },
    white: grey[50],
    green: green[400],
    yellow: yellow[400],
  },
});

const AppContainer = styled("div")({
  height: "100vh",
});

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const login = () => {
    setAuthenticated(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Routes>
            {authenticated && (
              <>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/new_diary" element={<NewDiary />} />
                <Route path="/diarys" element={<Diarys />} />
                <Route path="/wallet" element={<Wallet />} />
              </>
            )}
            <Route path="*" element={<Login login={login} />} />
          </Routes>
          {authenticated && <Navbar />}
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
