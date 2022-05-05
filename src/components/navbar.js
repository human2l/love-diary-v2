import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import Backdrop from "@mui/material/Backdrop";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MagicBox from "./magicBox";

const ModalContainer = styled("div")({});

const MagicBoxContainer = styled("div")({
  position: "absolute",
  //!!!Remember: both vertical and horizontal margin/padding percentage are ONLY base on parent element's WIDTH, not width and height
  bottom: "65px",
  left: "5%",
  width: "90%",

  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "2px solid black",
});

const Navbar = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(-1);

  const [open, setOpen] = useState(false);
  const handleOpenMagicBox = () => setOpen(true);
  const handleCloseMagicBox = () => setOpen(false);

  let navigate = useNavigate();

  const Navbar = styled(BottomNavigation)({
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: 0,
    height: "56px",
  });

  const navAction = (navValue) => {
    const actions = [
      () => navigate("/diarys"),
      () => navigate("/wallet"),

      () => handleOpenMagicBox(),
      () => navigate("/"),
      () => navigate("/settings"),
    ];
    return actions[navValue]();
  };

  return (
    <>
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
          // fetch settings whenever user click on one tab
          props.fetchSettings();
        }}
        showLabels
      >
        <BottomNavigationAction
          label={t("love_diary.label")}
          icon={<AssignmentIcon />}
        />
        <BottomNavigationAction
          label={t("wallet.label")}
          icon={<AccountBalanceWalletIcon />}
        />
        <BottomNavigationAction
          label={t("magic_box.label")}
          icon={<InventoryIcon fontSize="large" />}
        />
        <BottomNavigationAction label={t("we.label")} icon={<FavoriteIcon />} />
        <BottomNavigationAction
          label={t("settings.label")}
          icon={<SettingsIcon />}
        />
      </Navbar>
      <ModalContainer>
        <Modal
          open={open}
          onClose={handleCloseMagicBox}
          closeAfterTransition
          BackdropComponent={Backdrop}
          keepMounted
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide in={open} direction="up">
            <MagicBoxContainer>
              <MagicBox onClose={handleCloseMagicBox} />
            </MagicBoxContainer>
          </Slide>
        </Modal>
      </ModalContainer>
    </>
  );
};

export default Navbar;
