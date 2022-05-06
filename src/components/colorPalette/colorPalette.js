import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import colorSelectionPng from "../../assets/images/color-selection.png";
import colorsPng from "../../assets/images/colors.png";
import exchangePng from "../../assets/images/exchange.png";
import ColorTiles from "./colorTiles";

const ColorPaletteContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const ColorSelectorGroupContainer = styled("div")({
  marginTop: 10,
  height: 200,
  display: "flex",
  justifyContent: "space-between",
});
const TitleGroupContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
});

const PaletteSwitcher = styled("div")({
  marginTop: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonIconsGroup = styled("div")({
  width: 100,
  display: "flex",
  justifyContent: "space-between",
});

const SimplePaletteIcon = styled("img")({
  width: 25,
  height: 25,
});

const ProPaletteIcon = styled("img")({
  width: 25,
  height: 25,
});

const ConvertIcon = styled("img")({
  width: 25,
  height: 25,
});

const ColorPalette = ({
  primaryColor,
  secondaryColor,
  setPrimaryColor,
  setSecondaryColor,
}) => {
  const { t } = useTranslation();

  const [pro, setPro] = useState(false);

  return (
    <ColorPaletteContainer>
      <TitleGroupContainer>
        <Typography
          variant="h3"
          color={primaryColor}
          sx={{ marginTop: "10px" }}
        >
          {t("primary_color.label")}
        </Typography>
        <Typography
          variant="h3"
          color={secondaryColor}
          sx={{ marginTop: "10px" }}
        >
          {t("secondary_color.label")}
        </Typography>
      </TitleGroupContainer>
      <ColorSelectorGroupContainer>
        {pro ? (
          <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
        ) : (
          <ColorTiles pickColor={setPrimaryColor} />
        )}
        {pro ? (
          <HexColorPicker
            color={secondaryColor}
            onChange={setSecondaryColor}
            style={{ marginLeft: 5 }}
          />
        ) : (
          <ColorTiles pickColor={setSecondaryColor} />
        )}
      </ColorSelectorGroupContainer>
      <PaletteSwitcher>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          sx={{ borderRadius: 10 }}
          onClick={() => setPro(!pro)}
        >
          <ButtonIconsGroup>
            <SimplePaletteIcon src={colorsPng} />
            <ConvertIcon src={exchangePng} />
            <ProPaletteIcon src={colorSelectionPng} />
          </ButtonIconsGroup>
        </Button>
      </PaletteSwitcher>
    </ColorPaletteContainer>
  );
};
export default ColorPalette;
