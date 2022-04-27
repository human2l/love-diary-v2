import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { settingsContext } from "../App";
import ColorTiles from "../components/ColorTiles";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";

const SettingsContainer = styled("div")({
  height: "100%",
  marginBottom: 56,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const LanguageSelectorContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Settings = () => {
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
            <Typography
              variant="h6"
              color={primaryColor}
              sx={{ marginRight: "20px" }}
            >
              {t("language.label")}
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
          <Typography
            variant="h6"
            color={primaryColor}
            sx={{ marginTop: "10px" }}
          >
            {t("primary_color.label")}
          </Typography>
          <ColorTiles pickColor={setPrimaryColor} />
          <Typography
            variant="h6"
            color={secondaryColor}
            sx={{ marginTop: "10px" }}
          >
            {t("secondary_color.label")}
          </Typography>
          <ColorTiles pickColor={setSecondaryColor} />
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
    </>
  );
};
