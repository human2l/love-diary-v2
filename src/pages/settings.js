import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { settingsContext } from "../app";
import backgroundPng from "../assets/images/background.png";
import languagesPng from "../assets/images/languages.png";
import ColorPalette from "../components/colorPalette/colorPalette";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import LanguageSelector from "../components/languageSelector";
import useFilestack from "../hooks/useFilestack";

const SettingsContainer = styled("div")({
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  paddingBottom: 56,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  paddingTop: "10%",
  width: "90%",
  display: "flex",
  flexDirection: "column",
});

const LanguagesIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const BackgroundImageSettingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const BackgroundIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const LanguageSelectorContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Settings = () => {
  const { t } = useTranslation();
  const { user, settings, updateSettings, appSettings, updateAppSettings } =
    useContext(settingsContext);
  const [language, setLanguage] = useState(settings[user].language);

  const [nickname, setnickname] = useState(settings[user].nickname);
  const [primaryColor, setPrimaryColor] = useState(settings[user].primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    settings[user].secondaryColor
  );
  const { openBackgroundImagePicker } = useFilestack();

  const saveSettings = () => {
    const newSettings = {
      ...settings,
      [user]: {
        ...settings[user],
        nickname,
        primaryColor,
        secondaryColor,
        language,
      },
    };
    updateSettings(newSettings);
  };

  const changeBackgroundImage = async () => {
    await openBackgroundImagePicker((metadata) => {
      updateAppSettings({
        id: appSettings.id,
        backgroundImage: metadata.handle,
      });
    });
  };

  return (
    <GlassFullContainer>
      <SettingsContainer>
        <ItemContainer>
          <LanguageSelectorContainer>
            <LanguagesIcon src={languagesPng} sx={{ marginRight: "20px" }} />
            <Typography
              variant="h6"
              color={settings[user].primaryColor}
              sx={{ marginRight: "20px" }}
            >
              {/* {t("language.label")} */}:
            </Typography>
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </LanguageSelectorContainer>
          <TextField
            id="outlined-basic"
            label={t("nickname.label")}
            variant="outlined"
            size="small"
            defaultValue={nickname}
            onChange={(e) => setnickname(e.target.value)}
            sx={{
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: 2,
              border: "8px solid white",
            }}
          />
          <ColorPalette
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            setPrimaryColor={setPrimaryColor}
            setSecondaryColor={setSecondaryColor}
          />
          <BackgroundImageSettingContainer>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              sx={{ marginTop: "20px" }}
              onClick={changeBackgroundImage}
            >
              <BackgroundIcon src={backgroundPng} />
            </Button>
          </BackgroundImageSettingContainer>
          <Button
            size="large"
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={saveSettings}
          >
            {t("save.label")}
          </Button>
        </ItemContainer>
      </SettingsContainer>
    </GlassFullContainer>
  );
};

export default Settings;
