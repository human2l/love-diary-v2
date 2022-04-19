import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import gaoBaiQiQiuMusic from "../assets/sounds/gaoBaiQiQiu.mp3";

export const Navbar = (props) => {
  const [value, setValue] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [play, { stop }] = useSound(gaoBaiQiQiuMusic);

  let navigate = useNavigate();

  const Navbar = styled(BottomNavigation)({
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: 0,
    height: "56px",
  });

  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    isPlaying ? play() : stop();
  }, [isPlaying, play, stop]);

  return (
    <Navbar
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        switch (newValue) {
          case 0:
            navigate("/new_diary");
            break;
          case 1:
            navigate("/diarys");
            break;
          case 2:
            setIsPlaying(!isPlaying);
            break;
          case 3:
            navigate("/wallet");
            break;
          case 4:
            navigate("/");
            break;
          default:
            break;
        }
      }}
      showLabels
    >
      <BottomNavigationAction label="新的心情" icon={<CreateIcon />} />
      <BottomNavigationAction label="恋爱日记" icon={<AssignmentIcon />} />
      <BottomNavigationAction
        label=""
        icon={
          isPlaying ? (
            <StopCircleIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )
        }
      />
      <BottomNavigationAction
        label="钱包"
        icon={<AccountBalanceWalletIcon />}
      />
      <BottomNavigationAction label="我们" icon={<FavoriteIcon />} />
    </Navbar>
  );
};
