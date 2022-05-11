import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import soundOffPng from "../../assets/images/sound-off.png";
import soundOnPng from "../../assets/images/sound-on.png";
import gaoBaiQiQiuMusic from "../../assets/sounds/gaoBaiQiQiu.mp3";
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
  const { t } = useTranslation();
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const dispatch = useDispatch();

  const [play, { stop }] = useSound(gaoBaiQiQiuMusic, {
    volume: 0.5,
  });

  const handleClick = () => {
    !isPlaying ? play() : stop();
    dispatch(togglePlaying());
  };

  useEffect(() => {
    play();
  }, [play]);

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
