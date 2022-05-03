import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import gaoBaiQiQiuMusic from "../../assets/sounds/gaoBaiQiQiu.mp3";
import { togglePlaying } from "../../features/music/musicSlice";

const ItemContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 20,
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

  return (
    <ItemContainer onClick={handleClick}>
      <Avatar sx={{ bgcolor: "primary.main" }}>
        {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
      </Avatar>
      <Typography>
        {isPlaying ? t("music_on.label") : t("music_off.label")}
      </Typography>
    </ItemContainer>
  );
};
export default MusicItem;
