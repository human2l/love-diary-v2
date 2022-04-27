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
  const { t, i18n } = useTranslation();
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
          {t("hello.label")}
          <LanguageSelector />
          <TextField
            id="outlined-basic"
            label="昵称"
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
            主色调
          </Typography>
          <ColorTiles pickColor={setPrimaryColor} />
          <Typography
            variant="h6"
            color={secondaryColor}
            sx={{ marginTop: "10px" }}
          >
            副色调
          </Typography>
          <ColorTiles pickColor={setSecondaryColor} />
          <Button
            size="large"
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={saveSettings}
          >
            保存
          </Button>
        </ItemContainer>
      </SettingsContainer>
    </>
  );
};
