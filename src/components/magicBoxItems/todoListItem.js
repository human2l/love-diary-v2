import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { settingsContext } from "../../app";
import checklistPng from "../../assets/images/checklist.png";
import buttonMp3 from "../../assets/sounds/button.mp3";
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

const ChecklistIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const TodoListItem = (props) => {
  const { t } = useContext(settingsContext);
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });
  let navigate = useNavigate();
  const handleOnClick = () => {
    play();
    props.onClose();
    navigate("/toDoList");
  };
  return (
    <ItemContainer onClick={handleOnClick}>
      <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
        <ChecklistIcon src={checklistPng} />
      </Avatar>
      <Typography>{t("todo_list.label")}</Typography>
    </ItemContainer>
  );
};
export default TodoListItem;
