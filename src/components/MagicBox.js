import { styled } from "@mui/material";
import MusicItem from "./MagicBoxItems/musicItem";
import TodoListItem from "./MagicBoxItems/todoListItem";

const ItemsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const MagicBox = (props) => {
  return (
    <ItemsContainer>
      <MusicItem />
      <TodoListItem onClose={props.onClose} />
    </ItemsContainer>
  );
};
export default MagicBox;