import * as colors from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import Background from "./components/background";
import PageLoading from "./components/pageLoading";
import { USER_ID_MAP, DEFAULT_BACKGROUND_IMAGE_ID, LOCAL_BACKGROUND_IMAGE_MAP } from "./config/airtableConfig";
import useSoundLibrary from "./hooks/useSoundLibrary";
import Router from "./routes";
import {
  getCoupleSettingsByUserId,
  updateSettingsDB,
} from "./services/airtable/settingsService";
import "./services/i18next";

export const settingsContext = React.createContext({
  t: () => {},
  user: "",
  partner: "",
  settings: {},
  updateSettings: () => {},
  musicPlayer: {},
  setMusic: () => {},
});

const AppContainer = styled("div")({
  margin: "auto",
  height: "100vh",
  width: "100%",
  maxWidth: "700px",
});

function App() {
  const { t, i18n } = useTranslation();
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const authenticated = !!loggedInUsername;
  const { musicPlayer, setMusic } = useSoundLibrary();
  const queryClientContext = useQueryClient();

  const { data: fetchedSettings, isLoading: settingsLoading } = useQuery(
    ["coupleSettings", loggedInUsername],
    () => getCoupleSettingsByUserId(USER_ID_MAP[loggedInUsername]),
    {
      enabled: authenticated,
      staleTime: Infinity, // Settings don't change often
    }
  );

  const settings = useMemo(() => fetchedSettings || {}, [fetchedSettings]);
  const user = loggedInUsername;
  const partner = useMemo(() => {
    if (!fetchedSettings || !user) return "";
    const users = Object.keys(fetchedSettings);
    return users.find((currentUser) => currentUser !== user);
  }, [fetchedSettings, user]);

  const userSettings = useMemo(() => settings[user], [settings, user]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          main: userSettings?.primaryColor ?? colors.pink[400],
        },
        secondary: {
          main: userSettings?.secondaryColor ?? colors.blue[400],
        },
        text: {
          primary: userSettings?.primaryColor ?? colors.pink[400],
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
  }, [userSettings?.primaryColor, userSettings?.secondaryColor]);

  const updateSettings = async (newSettings) => {
    await updateSettingsDB(newSettings);
    queryClientContext.invalidateQueries(["coupleSettings", loggedInUsername]);
  };

  const login = async (username) => {
    setLoggedInUsername(username);
  };

  const userMusic = useMemo(() => userSettings?.music, [userSettings?.music]);

  useEffect(() => {
    setMusic(userMusic);
  }, [setMusic, userMusic]);

  const userLanguage = useMemo(
    () => userSettings?.language,
    [userSettings?.language]
  );
  useEffect(() => {
    i18n.changeLanguage(userLanguage);
  }, [i18n, userLanguage]);

  const currentBackgroundId = settings[user]?.backgroundImage || DEFAULT_BACKGROUND_IMAGE_ID;
  const backgroundSrc = LOCAL_BACKGROUND_IMAGE_MAP[currentBackgroundId] || LOCAL_BACKGROUND_IMAGE_MAP[DEFAULT_BACKGROUND_IMAGE_ID];

  if (settingsLoading && authenticated) {
    return (
      <AppContainer>
        <PageLoading />
      </AppContainer>
    );
  }

  return (
    <>
      <AppContainer>
        <settingsContext.Provider
          value={{
            t,
            user,
            partner,
            settings,
            updateSettings,
            musicPlayer,
            setMusic,
          }}
        >
          <ThemeProvider theme={theme}>
            <Router authenticated={authenticated} loginMethod={login} />
          </ThemeProvider>
        </settingsContext.Provider>
        <Background
          src={backgroundSrc}
        />
      </AppContainer>
    </>
  );
}

export default App;
