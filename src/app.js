import * as colors from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import useSound from "use-sound";
import loadingHeartsSvg from "./assets/images/loadingHearts.svg";
import gaoBaiQiQiuMusic from "./assets/sounds/gaoBaiQiQiu.mp3";
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
  playBgm: () => {},
  stopBgm: () => {},
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
  const { i18n } = useTranslation();
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState({});
  const [appSettings, setAppSettings] = useState({});
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [play, { stop }] = useSound(gaoBaiQiQiuMusic, {
    volume: 0.5,
  });

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
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchSettings();
    })();
  }, []);

  useEffect(() => {
    play();
  }, [play]);

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
                  user,
                  settings,
                  updateSettings,
                  appSettings,
                  updateAppSettings,
                  playBgm: play,
                  stopBgm: stop,
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
