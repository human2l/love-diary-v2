import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import { Navbar } from "./components/Navbar";
import { NewDiary } from "./pages/NewDiary";
import { Diarys } from "./pages/Diarys";
import { Dashboard } from "./pages/Dashboard";
import { Wallet } from "./pages/Wallet";
import { Login } from "./pages/Login";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { Settings } from "./pages/Settings";
import useAirtable from "./hooks/useAirtable";
import loadingHeartsSvg from "./assets/images/loadingHearts.svg";
import "./services/i18next";
import { useTranslation } from "react-i18next";

export const settingsContext = React.createContext({
  user: "",
  settings: {},
  updateSettings: () => {},
});

const AppContainer = styled("div")({
  height: "100vh",
});

const LoadingImgWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  const { i18n } = useTranslation();
  const { getUserSettings, updateSettingsDB } = useAirtable();
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState({});
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateSettings = async (newSettings) => {
    await updateSettingsDB(newSettings);
    setSettings(newSettings);
  };

  const login = (user) => {
    setAuthenticated(true);
    setUser(user);
  };

  const fetchSettings = useCallback(async () => {
    setSettings(await getUserSettings());
  }, [getUserSettings]);

  useEffect(() => {
    (async () => {
      fetchSettings();
      setIsLoading(false);
    })();
  }, [fetchSettings]);

  useEffect(() => {
    (async () => {
      const newTheme = createTheme({
        palette: {
          primary: {
            main: settings[user]?.primaryColor || colors.pink[400],
          },
          secondary: {
            main: settings[user]?.secondaryColor || colors.blue[400],
          },
          text: {
            primary: settings[user]?.primaryColor || colors.pink[400],
            light: colors.pink[50],
          },
          pink: colors.pink[400],
          blue: colors.blue[400],
          white: colors.grey[50],
          black: colors.grey[800],
        },
        typography: {
          fontFamily: ["Ma Shan Zheng"].join(","),
        },
      });
      setTheme(newTheme);
    })();
  }, [settings, user]);

  useEffect(() => {
    i18n.changeLanguage(settings[user]?.language);
  }, [i18n, settings, user]);

  return (
    <AppContainer>
      {isLoading ? (
        <LoadingImgWrapper>
          <img src={loadingHeartsSvg} alt="loading" />
        </LoadingImgWrapper>
      ) : (
        <settingsContext.Provider value={{ user, settings, updateSettings }}>
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                {authenticated && (
                  <>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/new_diary" element={<NewDiary />} />
                    <Route path="/diarys" element={<Diarys />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/settings" element={<Settings />} />
                  </>
                )}
                <Route path="*" element={<Login login={login} />} />
              </Routes>
              {authenticated && <Navbar fetchSettings={fetchSettings} />}
            </Router>
          </ThemeProvider>
        </settingsContext.Provider>
      )}
    </AppContainer>
  );
}

export default App;
