import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { settingsContext } from "../App";
import ColorTiles from "../components/ColorTiles";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";

const SettingsContainer = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  marginTop: 50,
  paddingTop: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Settings = () => {
  const { t } = useTranslation();

  const { user, settings, updateSettings } = useContext(settingsContext);
  const [primaryColor, setPrimaryColor] = useState(settings[user].primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    settings[user].secondaryColor
  );
  const [nickName, setNickName] = useState(settings[user].nickName);

  const saveSettings = () => {
    const newSettings = {
      ...settings,
      [user]: { ...settings[user], nickName, primaryColor, secondaryColor },
    };
    updateSettings(newSettings);
  };

  return (
    <>
      <SettingsContainer>
        <ItemContainer>
          <LanguageSelector />
          <TextField
            id="outlined-basic"
            label={t("nickname.label")}
            variant="outlined"
            size="small"
            defaultValue={nickName}
            onChange={(e) => setNickName(e.target.value)}
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
