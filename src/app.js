import * as colors from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import loadingHeartsSvg from "./assets/images/loadingHearts.svg";
import Background from "./components/background";
import useSoundLibrary from "./hooks/useSoundLibrary";
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
  t: () => {},
  user: "",
  settings: {},
  updateSettings: () => {},
  appSettings: {},
  updateAppSettings: () => {},
  musicPlayer: {},
  setMusic: () => {},
});

const AppContainer = styled("div")({
  height: "100vh",
});

const LoadingBackground = styled("div")({
  height: "100%",
  width: "100%",
  backgroundColor: "pink",
});

const LoadingImgWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  const { t, i18n } = useTranslation();
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState({});
  const [appSettings, setAppSettings] = useState({});
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { musicPlayer, setMusic } = useSoundLibrary();

  const updateSettings = async (newSettings) => {
    console.log("updateSettings");
    await updateSettingsDB(newSettings);
    setSettings(newSettings);
  };

  const updateAppSettings = async (newAppSettings) => {
    console.log("updateAppSettings");
    await updateAppSettingsDB(newAppSettings);
    setAppSettings(newAppSettings);
  };

  const login = (user) => {
    console.log("login");
    setAuthenticated(true);
    setUser(user);
  };

  const fetchSettings = async () => {
    console.log("fetchSettings");
    setSettings(await getUserSettings());
    setAppSettings(await getAppSettings());
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchSettings();
    })();
  }, []);

  useEffect(() => {
    console.log("setMusic");

    musicPlayer && musicPlayer.stop();
    settings[user]?.music && setMusic(settings[user]?.music);
  }, [musicPlayer, setMusic, settings, user]);

  useEffect(() => {
    musicPlayer && musicPlayer.play();
  }, [musicPlayer]);

  const newTheme = useMemo(() => {
    console.log("createNewTheme");
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
    console.log("setTheme");
    setTheme(newTheme);
  }, [newTheme]);

  useEffect(() => {
    i18n.changeLanguage(settings[user]?.language);
  }, [i18n, settings, user]);

  return (
    <>
      <AppContainer>
        {isLoading ? (
          <LoadingBackground>
            <LoadingImgWrapper>
              <img src={loadingHeartsSvg} alt="loading" height="500px" />
            </LoadingImgWrapper>
          </LoadingBackground>
        ) : (
          <>
            <QueryClientProvider client={queryClient}>
              {/* {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtoolsPanel style={{ paddingBottom: "70px" }} />
              )} */}
              <settingsContext.Provider
                value={{
                  t,
                  user,
                  settings,
                  updateSettings,
                  appSettings,
                  updateAppSettings,
                  musicPlayer,
                  setMusic,
                }}
              >
                <ThemeProvider theme={theme}>
                  <Router
                    authenticated={authenticated}
                    loginMethod={login}
                    fetchSettings={fetchSettings}
                  />
                </ThemeProvider>
              </settingsContext.Provider>
            </QueryClientProvider>
            <Background
              imgId={appSettings.backgroundImage}
              defaultImgId={appSettings.defaultBackgroundImage}
            />
          </>
        )}
      </AppContainer>
      {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
    </>
  );
}

export default App;
