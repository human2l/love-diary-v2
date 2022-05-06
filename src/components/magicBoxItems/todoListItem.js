import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
// import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import checklistPng from "../../assets/images/checklist.png";

const ItemContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 20,
});

const ChecklistIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const TodoListItem = (props) => {
  const { t } = useTranslation();
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
