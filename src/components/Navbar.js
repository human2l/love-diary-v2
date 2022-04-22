import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import gaoBaiQiQiuMusic from "../assets/sounds/gaoBaiQiQiu.mp3";

export const Navbar = (props) => {
  const [value, setValue] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [play, { stop }] = useSound(gaoBaiQiQiuMusic, { volume: 0.5 });

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

  const navAction = (navValue) => {
    const actions = [
      () => navigate("/diarys"),
      () => navigate("/wallet"),
      () => setIsPlaying(!isPlaying),
      () => navigate("/"),
      () => navigate("/settings"),
    ];
    return (actions[navValue] || null)();
  };

  return (
    <Navbar
      sx={{
        boxShadow: "0 5px 40px #f19da2",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        navAction(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="恋爱日记" icon={<AssignmentIcon />} />
      <BottomNavigationAction
        label="钱包"
        icon={<AccountBalanceWalletIcon />}
      />
      <BottomNavigationAction
        label=""
        icon={
          isPlaying ? (
            <MusicNoteIcon fontSize="large" />
          ) : (
            <MusicOffIcon fontSize="large" />
          )
        }
      />
      <BottomNavigationAction label="我们" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="设置" icon={<SettingsIcon />} />
    </Navbar>
  );
};
