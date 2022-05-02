import { styled } from "@mui/material";
import Music from "./MagicBoxItems/Music";

const ItemsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const MagicBox = () => {
  return (
    <ItemsContainer>
      <Music />
    </ItemsContainer>
  );
};
export default MagicBox;
