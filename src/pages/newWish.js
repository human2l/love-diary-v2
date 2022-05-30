import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import addImagePng from "../assets/images/add-image.png";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import useFilestack from "../hooks/useFilestack";

const steps = ["选择图片", "写点啥"];

const NewWishContainer = styled("div")({
  boxSizing: "border-box",
  width: "100%",
  paddingBottom: "65px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StepperContainer = styled("div")({
  paddingTop: "10px",
  paddingBottom: "5px",
  width: "100%",
  backgroundColor: "white",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
});

const AddImageIcon = styled("img")({
  maxHeight: 30,
  aspectRatio: "1/1",
});

const NewWish = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useContext(settingsContext);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { fileMetadata, openFilePicker, getAuthImgUrl } = useFilestack();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const selectImageFile = async (e) => {
    e.preventDefault();
    await openFilePicker(() => {
      setImageUploaded(true);
    });
  };

  useEffect(() => {
    activeStep === steps.length && navigate("/wishboard");
  }, [activeStep, navigate]);

  let selectImageStep;
  if (!imageUploaded) {
    selectImageStep = (
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ borderRadius: "10px" }}
        onClick={(e) => {
          selectImageFile(e);
        }}
      >
        <AddImageIcon src={addImagePng} />
        {t("add_photo.label")}
      </Button>
    );
  } else {
    selectImageStep = (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={getAuthImgUrl(fileMetadata.handle)}
          />
        </CardActionArea>
      </Card>
    );
  }

  return (
    <GlassFullContainer>
      <NewWishContainer>
        <StepperContainer>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperContainer>
        <Box sx={{ mt: "10px", flex: "auto" }}>
          {activeStep === 0 ? selectImageStep : <div>asdf</div>}
        </Box>

        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "保存" : "下一步"}
        </Button>
      </NewWishContainer>
    </GlassFullContainer>
  );
};
export default NewWish;
