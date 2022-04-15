import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Navbar = (props) => {
  let navigate = useNavigate();

  const Navbar = styled(BottomNavigation)({
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: 0,
    height: "56px",
  });

  const [value, setValue] = useState(-1);
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
            navigate("/wallet");
            break;
          case 3:
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
        label="钱包"
        icon={<AccountBalanceWalletIcon />}
      />
      <BottomNavigationAction label="我们" icon={<FavoriteIcon />} />
    </Navbar>
  );
};
