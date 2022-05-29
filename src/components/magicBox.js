import { styled } from "@mui/material/styles";
import treasurePng from "../assets/images/treasure.png";
import MusicCollectionItem from "./magicBoxItems/musicCollectionItem";
import MusicItem from "./magicBoxItems/musicItem";
import TodoListItem from "./magicBoxItems/todoListItem";
import WishboardItem from "./magicBoxItems/wishboardItem";

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
});

const MagicBox = (props) => {
  return (
    <>
      <ChestImageContainer>
        <ChestImage src={treasurePng} />
      </ChestImageContainer>
      <ItemsContainer>
        <MusicItem />
        <MusicCollectionItem onClose={props.onClose} />
        <TodoListItem onClose={props.onClose} />
        <WishboardItem onClose={props.onClose} />
      </ItemsContainer>
    </>
  );
};
export default MagicBox;
