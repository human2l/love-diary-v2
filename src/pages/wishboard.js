import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import addWishPng from "../assets/images/add.png";
import buttonMp3 from "../assets/sounds/button.mp3";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import PageLoading from "../components/pageLoading";
import useFilestack from "../hooks/useFilestack";
import { getAllWishes } from "../services/airtable/wishboardService";

const WishboardContainer = styled("div")({
  marginLeft: "5px",
  marginRight: "5px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 65,
});

const AddNewWishImageButton = styled(Fab)({
  position: "fixed",
  bottom: 70,
  right: 15,
});

const Wishboard = () => {
  const { getAuthImgUrl } = useFilestack();
  const { isLoading, data: wishes } = useQuery("getAllWishes", getAllWishes);
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });
  let navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <GlassFullContainer>
          <WishboardContainer>
            <Box sx={{ overflowY: "scroll" }}>
              <ImageList variant="masonry" cols={1} gap={0}>
                {wishes.map((wish) => (
                  <ImageListItem key={wish.key}>
                    <img
                      src={getAuthImgUrl(wish.imageId)}
                      alt={wish.imageId}
                      loading="lazy"
                    />
                    <ImageListItemBar title={wish.description} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
            <AddNewWishImageButton
              color="primary"
              aria-label="edit"
              onClick={() => {
                play();
                navigate("/newWish");
              }}
            >
              <img src={addWishPng} height={30} width={30} alt="writing-icon" />
            </AddNewWishImageButton>
          </WishboardContainer>
        </GlassFullContainer>
      )}
    </>
  );
};
export default Wishboard;
