import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import useSound from "use-sound";
import { settingsContext } from "../../app";
import gptPng from "../../assets/images/gpt.png";
import buttonMp3 from "../../assets/sounds/button.mp3";
const ItemContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  height: "64px",
  width: "64px",
});
const AlbumIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const GptItem = () => {
  const { t } = useContext(settingsContext);
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });
  const handleOnClick = () => {
    play();
    window.open("http://206.189.153.183:3000", "_blank");
  };

  return (
    <ItemContainer onClick={handleOnClick}>
      <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
        <AlbumIcon src={gptPng} />
      </Avatar>
      <Typography>{t("gpt.label")}</Typography>
    </ItemContainer>
  );
};
export default GptItem;
