import Avatar from "@mui/material/Avatar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import gaoBaiQiQiuMusic from "../../assets/sounds/gaoBaiQiQiu.mp3";
import { styled, Typography } from "@mui/material";
import useSound from "use-sound";
import { useSelector, useDispatch } from "react-redux";
import { togglePlaying } from "../../features/music/musicSlice";

const ItemContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
});
const Music = () => {
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
      <Typography>{isPlaying ? "Music On" : "Music Off"}</Typography>
    </ItemContainer>
  );
};
export default Music;
