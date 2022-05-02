import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
// import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ItemContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 20,
});

const ToDoListItem = (props) => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const handleOnClick = () => {
    props.onClose();
    navigate("/toDoList");
  };
  return (
    <ItemContainer onClick={handleOnClick}>
      <Avatar sx={{ bgcolor: "primary.main" }}>
        <FormatListNumberedIcon />
      </Avatar>
      <Typography>{t("todo_list.label")}</Typography>
    </ItemContainer>
  );
};
export default ToDoListItem;
