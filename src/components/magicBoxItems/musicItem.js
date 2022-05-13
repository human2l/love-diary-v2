import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useState } from "react";
import { settingsContext } from "../../app";
import soundOffPng from "../../assets/images/sound-off.png";
import soundOnPng from "../../assets/images/sound-on.png";

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
  const { t, musicPlayer } = useContext(settingsContext);
  const [playMusic, setPlayMusic] = useState(true);

  const handleClick = () => {
    if (musicPlayer.playing()) {
      musicPlayer.stop();
      setPlayMusic(false);
    } else {
      musicPlayer.play();
      setPlayMusic(true);
    }
  };

  //setPlayMusic to true whenever musicPlayer change, because musicPlayer will autoplay when created, (however, musicPlayer.playing() will still be false for a moment)
  useEffect(() => {
    setPlayMusic(true);
  }, [musicPlayer]);

  return (
    <ItemContainer onClick={handleClick}>
      <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
        {playMusic ? (
          <SoundOnIcon src={soundOnPng} />
        ) : (
          <SoundOffIcon src={soundOffPng} />
        )}
      </Avatar>
      <Typography>
        {playMusic ? t("music_on.label") : t("music_off.label")}
      </Typography>
    </ItemContainer>
  );
};
export default MusicItem;
