import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { settingsContext } from "../app";
import languagesPng from "../assets/images/languages.png";
import ColorTiles from "../components/colorTiles";
import LanguageSelector from "../components/languageSelector";

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

const LanguageSelectorContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ColorSelectorGroupContainer = styled("div")({
  display: "flex",

  width: "100%",
});

const ColorSelectorContainer = styled("div")({
  width: "50%",
});

const Settings = () => {
  const { t } = useTranslation();

  const { user, settings, updateSettings } = useContext(settingsContext);
  const [language, setLanguage] = useState(settings[user].language);
  const [primaryColor, setPrimaryColor] = useState(settings[user].primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    settings[user].secondaryColor
  );
  const [nickname, setnickname] = useState(settings[user].nickname);

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

  return (
    <>
      <SettingsContainer>
        <ItemContainer>
          <LanguageSelectorContainer>
            <LanguagesIcon src={languagesPng} sx={{ marginRight: "20px" }} />
            <Typography
              variant="h6"
              color={primaryColor}
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
            sx={{ marginTop: "20px" }}
          />
          <ColorSelectorGroupContainer>
            <ColorSelectorContainer>
              <Typography
                variant="h6"
                color={primaryColor}
                sx={{ marginTop: "10px" }}
              >
                {t("primary_color.label")}
              </Typography>
              <ColorTiles pickColor={setPrimaryColor} />
            </ColorSelectorContainer>
            <ColorSelectorContainer>
              <Typography
                variant="h6"
                color={secondaryColor}
                sx={{ marginTop: "10px" }}
              >
                {t("secondary_color.label")}
              </Typography>
              <ColorTiles pickColor={setSecondaryColor} />
            </ColorSelectorContainer>
          </ColorSelectorGroupContainer>
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
      {/* <a href="https://www.flaticon.com/free-icons/language" title="language icons">Language icons created by Freepik - Flaticon</a> */}
    </>
  );
};

export default Settings;
