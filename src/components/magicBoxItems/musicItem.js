import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { settingsContext } from "../../app";
import soundOffPng from "../../assets/images/sound-off.png";
import soundOnPng from "../../assets/images/sound-on.png";
import { togglePlaying } from "../../features/music/musicSlice";

const ItemContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 20,
  height: "64px",
  width: "64px",
});

const SoundOnIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const SoundOffIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});
const MusicItem = () => {
  const { playBgm, stopBgm } = useContext(settingsContext);
  const { t } = useTranslation();
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const dispatch = useDispatch();

  const handleClick = () => {
    !isPlaying ? playBgm() : stopBgm();
    dispatch(togglePlaying());
  };

  useEffect(() => {
    playBgm();
  }, [playBgm]);

  return (
    <ItemContainer onClick={handleClick}>
      <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
        {isPlaying ? (
          <SoundOnIcon src={soundOnPng} />
        ) : (
          <SoundOffIcon src={soundOffPng} />
        )}
      </Avatar>
      <Typography>
        {isPlaying ? t("music_on.label") : t("music_off.label")}
      </Typography>
    </ItemContainer>
  );
};
export default MusicItem;
