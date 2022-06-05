import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import addImagePng from "../assets/images/add-image.png";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import useFilestack from "../hooks/useFilestack";
import useLocalStorage from "../hooks/useLocalStorage";
import useTypingSound from "../hooks/useTypingSound";
import { addWish } from "../services/airtable/wishboardService";

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

const ContentContainer = styled("div")({
  marginTop: "10px",
  flex: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const AddImageIcon = styled("img")({
  maxHeight: 30,
  aspectRatio: "1/1",
});

const NewWish = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { t, user, getPartner, settings } = useContext(settingsContext);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { fileMetadata, openFilePicker, getAuthImgUrl } = useFilestack();
  const [description, setDescription] = useLocalStorage("newWishDraft", "");
  const [playTypingSound] = useTypingSound();
  const queryClient = useQueryClient();

  const steps = [t("add_image.label"), t("write_something.label")];

  const nextAvailable = () => {
    if (activeStep === 0) return imageUploaded;
    return true;
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      const createrId = settings[user].id;
      const partnerId = settings[getPartner()].id;
      const newWish = {
        imageId: fileMetadata.handle,
        description,
        createrId,
        partnerId,
      };
      await addWish(newWish);
      queryClient.invalidateQueries("fetchAllWishes");
      navigate("/wishboard");
      setDescription("");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const selectImageFile = async (e) => {
    e.preventDefault();
    await openFilePicker(() => {
      setImageUploaded(true);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
    playTypingSound();
  };

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
      <img
        src={getAuthImgUrl(fileMetadata.handle)}
        alt="preview"
        style={{
          maxHeight: "70vh",
          objectFit: "contain",
        }}
      />
    );
  }

  const addDescriptionStep = (
    <TextField
      inputProps={{
        autoComplete: "off",
      }}
      value={description}
      label={t("wish_discription.label")}
      variant="outlined"
      size="small"
      sx={{
        width: "90%",
        backgroundColor: "white",
        borderRadius: 2,
        border: "8px solid white",
      }}
      onChange={(e) => handleChange(e)}
    />
  );

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
        <ContentContainer>
          {activeStep === 0 ? selectImageStep : addDescriptionStep}
        </ContentContainer>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!nextAvailable()}
        >
          {activeStep === steps.length - 1
            ? t("save.label")
            : t("next_step.label")}
        </Button>
      </NewWishContainer>
    </GlassFullContainer>
  );
};
export default NewWish;
