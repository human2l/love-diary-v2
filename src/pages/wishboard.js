import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useSound from "use-sound";
import addWishPng from "../assets/images/add.png";
import buttonMp3 from "../assets/sounds/button.mp3";
import PageLoading from "../components/pageLoading";
import useFilestack from "../hooks/useFilestack";
import { addWish, getAllWishes } from "../services/airtable/wishboardService";

const WishboardContainer = styled("div")({
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
  const { openWishImagePicker, getAuthImgUrl } = useFilestack();
  const { isLoading, data: wishes } = useQuery("getAllWishes", getAllWishes);

  const [newWishImageId, setNewWishImageId] = useState(null);
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });

  const addWishImage = async () => {
    await openWishImagePicker((imageId) => {
      console.log(imageId);
      setNewWishImageId(imageId);
    });
  };

  useEffect(() => {
    (async () => {
      if (newWishImageId) {
        const newWish = { imageId: newWishImageId };
        await addWish(newWish);
      }
    })();
  }, [newWishImageId]);

  //   useEffect(() => {
  //     (async () => {
  //       console.log(await getAllWishes());
  //     })();
  //   }, []);

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <WishboardContainer>
          <Box sx={{ overflowY: "scroll" }}>
            {newWishImageId ?? newWishImageId}
            <ImageList variant="masonry" cols={2} gap={8}>
              {wishes.map((wish) => (
                <ImageListItem key={wish.key}>
                  <img
                    src={getAuthImgUrl(wish.imageId)}
                    alt={wish.imageId}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <AddNewWishImageButton
            color="primary"
            aria-label="edit"
            onClick={() => {
              play();
              addWishImage();
            }}
          >
            <img src={addWishPng} height={30} width={30} alt="writing-icon" />
          </AddNewWishImageButton>
        </WishboardContainer>
      )}
    </>
  );
};
export default Wishboard;
