import * as colors from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import Background from "./components/background";
import useSoundLibrary from "./hooks/useSoundLibrary";
import Router from "./routes";
import {
  getCoupleSettingsByUserId,
  updateSettingsDB,
} from "./services/airtable/settingsService";
import "./services/i18next";

const queryClient = new QueryClient();

//! hardcode for now
const USER_ID_RELATIONSHIP = {
  Dan: "recISybotETJtZOaI",
  Kai: "recW7reKMhDGMg8AV",
  Alice: "recGvx4sVJTirnLjN",
  Bob: "recxhOgxeKaYMdbGI",
};

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
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState({});
  const [user, setUser] = useState("");
  const [partner, setPartner] = useState("");
  const { musicPlayer, setMusic } = useSoundLibrary();

  const userSettings = useMemo(() => settings[user], [settings, user]);

  const theme = useMemo(() => {
    console.log("createNewTheme");
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
    console.log("updateSettings");
    await updateSettingsDB(newSettings);
    setSettings(newSettings);
  };

  const login = async (user) => {
    console.log("login");
    await fetchSettings(user);
    setAuthenticated(true);
  };

  const fetchSettings = async (user) => {
    console.log("fetchSettings");
    const fetchedSettings = await getCoupleSettingsByUserId(
      USER_ID_RELATIONSHIP[user]
    );
    const users = Object.keys(fetchedSettings);
    setUser(user);
    setPartner(users.find((currentUser) => currentUser !== user));
    setSettings(fetchedSettings);
  };

  const userMusic = useMemo(() => userSettings?.music, [userSettings?.music]);

  useEffect(() => {
    console.log("setMusic");
    setMusic(userMusic);
  }, [setMusic, userMusic]);

  const userLanguage = useMemo(
    () => userSettings?.language,
    [userSettings?.language]
  );
  useEffect(() => {
    console.log("setLanguage");
    i18n.changeLanguage(userLanguage);
  }, [i18n, userLanguage]);

  return (
    <>
      <AppContainer>
        <QueryClientProvider client={queryClient}>
          {/* {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtoolsPanel style={{ paddingBottom: "70px" }} />
              )} */}
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
        </QueryClientProvider>
        <Background
          imgId={settings[user]?.backgroundImage}
          defaultImgId={"Kqwt7tNSTCYJXKKNJnl7"}
        />
      </AppContainer>
    </>
  );
}

export default App;
