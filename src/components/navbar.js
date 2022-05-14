import Backdrop from "@mui/material/Backdrop";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import diaryPng from "../assets/images/diary.png";
import magicBoxPng from "../assets/images/magicBox.png";
import settingsPng from "../assets/images/settings.png";
import walletPng from "../assets/images/wallet.png";
import wePng from "../assets/images/we.png";
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
  const { t, user, settings } = useContext(settingsContext);

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
    height: "60px",
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
          boxShadow: `0 10px 30px ${settings[user].primaryColor}`,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navAction(newValue);
          // fetch settings whenever user click on one tab
          // props.fetchSettings();
        }}
        // showLabels
      >
        <BottomNavigationAction
          label={t("love_diary.label")}
          icon={<img src={diaryPng} alt="diary" height={40} width={40} />}
        />
        <BottomNavigationAction
          label={t("wallet.label")}
          icon={<img src={walletPng} alt="diary" height={40} width={40} />}
        />
        <BottomNavigationAction
          label={t("magic_box.label")}
          icon={<img src={magicBoxPng} alt="diary" height={40} width={40} />}
        />
        <BottomNavigationAction
          label={t("we.label")}
          icon={<img src={wePng} alt="diary" height={40} width={40} />}
        />
        <BottomNavigationAction
          label={t("settings.label")}
          icon={<img src={settingsPng} alt="diary" height={40} width={40} />}
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
