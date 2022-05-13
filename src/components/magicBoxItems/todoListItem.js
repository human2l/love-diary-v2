import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../../app";
import checklistPng from "../../assets/images/checklist.png";

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

  let navigate = useNavigate();
  const handleOnClick = () => {
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
