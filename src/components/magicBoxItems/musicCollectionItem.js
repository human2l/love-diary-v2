import { styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import albumPng from "../../assets/images/album.png";

const ItemContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 20,
});
const AlbumIcon = styled("img")({
  maxHeight: 35,
  aspectRatio: "1/1",
});

const MusicCollectionItem = (props) => {
  let navigate = useNavigate();

  const handleOnClick = () => {
    props.onClose();
    navigate("/musicCollection");
  };

  return (
    <ItemContainer onClick={handleOnClick}>
      <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
        <AlbumIcon src={albumPng} />
      </Avatar>
      <Typography>音乐库</Typography>
    </ItemContainer>
  );
};
export default MusicCollectionItem;
