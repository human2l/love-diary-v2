import { styled } from "@mui/material";
import treasurePng from "../assets/images/treasure.png";
import MusicItem from "./magicBoxItems/musicItem";
import TodoListItem from "./magicBoxItems/todoListItem";

const ItemsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const ChestImageContainer = styled("div")({
  width: "100%",
  position: "absolute",
  transform: "translate(0,-100%)",
});

const ChestImage = styled("img")({
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  maxHeight: 64,
  aspectRatio: "1/1",
  height: "20%",
  // width: "20%",
});

const MagicBox = (props) => {
  return (
    <>
      <ChestImageContainer>
        <ChestImage src={treasurePng} />
      </ChestImageContainer>
      <ItemsContainer>
        <MusicItem />
        <TodoListItem onClose={props.onClose} />
        {/* <a href="https://www.flaticon.com/free-icons/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a> */}
      </ItemsContainer>
    </>
  );
};
export default MagicBox;
