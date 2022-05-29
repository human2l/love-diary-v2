import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useSound from "use-sound";
import addWishPng from "../assets/images/add.png";
import buttonMp3 from "../assets/sounds/button.mp3";
import useFilestack from "../hooks/useFilestack";

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
  const { fileMetadata, openFilePicker } = useFilestack();
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });
  return (
    <WishboardContainer>
      <Box sx={{ overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={2} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
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
          openFilePicker(() => {
            console.log("opened");
          });
        }}
      >
        <img src={addWishPng} height={30} width={30} alt="writing-icon" />
      </AddNewWishImageButton>
    </WishboardContainer>
  );
};
export default Wishboard;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];
