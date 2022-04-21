import * as colors from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { settingsContext } from "../App";

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

const ColorTiles = styled("div")({
  marginTop: 10,
  display: "flex",
  flexWrap: "wrap",
  width: 160,
});

const ColorTile = styled("div")({
  width: 30,
  height: 30,
  border: "1px solid white",
});

export const Settings = () => {
  const { user, settings, updateSettings } = useContext(settingsContext);
  const [primaryColor, setPrimaryColor] = useState(settings[user].primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    settings[user].secondaryColor
  );
  const [nickName, setNickName] = useState(settings[user].nickName);
  const pickPrimaryColor = (colorValue) => {
    setPrimaryColor(colorValue);
  };

  const pickSecondaryColor = (colorValue) => {
    setSecondaryColor(colorValue);
  };

  const saveSettings = () => {
    const newSettings = {
      ...settings,
      [user]: { ...settings[user], nickName, primaryColor, secondaryColor },
    };
    updateSettings(newSettings);
  };

  const colorMap = [
    { amber: colors.amber[500] },
    { blue: colors.blue[500] },
    { blueGrey: colors.blueGrey[500] },
    { brown: colors.brown[500] },
    { cyan: colors.cyan[500] },
    { deepOrange: colors.deepOrange[500] },
    { deepPurple: colors.deepPurple[500] },
    { green: colors.green[500] },
    { grey: colors.grey[500] },
    { indigo: colors.indigo[500] },
    { lightBlue: colors.lightBlue[500] },
    { lightGreen: colors.lightGreen[500] },
    { lime: colors.lime[500] },
    { orange: colors.orange[500] },
    { pink: colors.pink[500] },
    { purple: colors.purple[500] },
    { red: colors.red[500] },
    { teal: colors.teal[500] },
    { yellow: colors.yellow[500] },
  ];

  return (
    <>
      <SettingsContainer>
        <ItemContainer>
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
          <ColorTiles>
            {colorMap.map((colorObject) => {
              const colorName = Object.keys(colorObject)[0];
              const colorValue = Object.values(colorObject)[0];
              return (
                <ColorTile
                  key={colorName}
                  sx={{ backgroundColor: colorValue }}
                  onClick={() => pickPrimaryColor(colorValue)}
                />
              );
            })}
          </ColorTiles>
          <Typography
            variant="h6"
            color={secondaryColor}
            sx={{ marginTop: "10px" }}
          >
            副色调
          </Typography>
          <ColorTiles>
            {colorMap.map((colorObject) => {
              const colorName = Object.keys(colorObject)[0];
              const colorValue = Object.values(colorObject)[0];
              return (
                <ColorTile
                  key={colorName}
                  sx={{ backgroundColor: colorValue }}
                  onClick={() => pickSecondaryColor(colorValue)}
                />
              );
            })}
          </ColorTiles>
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
