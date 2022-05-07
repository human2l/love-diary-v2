import * as colors from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import loadingHeartsSvg from "./assets/images/loadingHearts.svg";
import Background from "./components/background";
import Router from "./routes";
import {
  getAppSettings,
  getUserSettings,
  updateAppSettingsDB,
  updateSettingsDB,
} from "./services/airtable";
import "./services/i18next";

const queryClient = new QueryClient();

export const settingsContext = React.createContext({
  user: "",
  settings: {},
  updateSettings: () => {},
  appSettings: {},
  updateAppSettings: () => {},
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
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState({});
  const [appSettings, setAppSettings] = useState({});
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateSettings = async (newSettings) => {
    await updateSettingsDB(newSettings);
    setSettings(newSettings);
  };

  const updateAppSettings = async (newAppSettings) => {
    await updateAppSettingsDB(newAppSettings);
    setAppSettings(newAppSettings);
  };

  const login = (user) => {
    setAuthenticated(true);
    setUser(user);
  };

  const fetchSettings = async () => {
    setSettings(await getUserSettings());
    setAppSettings(await getAppSettings());
  };

  useEffect(() => {
    (async () => {
      fetchSettings();
      setIsLoading(false);
    })();
  }, []);

  const newTheme = useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          main: settings[user]?.primaryColor ?? colors.pink[400],
        },
        secondary: {
          main: settings[user]?.secondaryColor ?? colors.blue[400],
        },
        text: {
          primary: settings[user]?.primaryColor ?? colors.pink[400],
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
  }, [settings, user]);

  useEffect(() => {
    setTheme(newTheme);
  }, [newTheme]);

  useEffect(() => {
    i18n.changeLanguage(settings[user]?.language);
  }, [i18n, settings, user]);

  return (
    <>
      {isLoading ? (
        <LoadingImgWrapper>
          <img src={loadingHeartsSvg} alt="loading" />
        </LoadingImgWrapper>
      ) : (
        <AppContainer>
          <QueryClientProvider client={queryClient}>
            <settingsContext.Provider
              value={{
                user,
                settings,
                updateSettings,
                appSettings,
                updateAppSettings,
              }}
            >
              <ThemeProvider theme={theme}>
                <Background>
                  <Router
                    authenticated={authenticated}
                    loginMethod={login}
                    fetchSettings={fetchSettings}
                  />
                </Background>
              </ThemeProvider>
            </settingsContext.Provider>
          </QueryClientProvider>
        </AppContainer>
      )}
      {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
    </>
  );
}

export default App;
