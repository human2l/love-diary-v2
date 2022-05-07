import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import ConfirmModal from "../components/confirmModal";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import useFilestack from "../hooks/useFilestack";
import { addNewDiary } from "../services/airtable";
import { getCurrentTimestamp } from "../utils/date_utils";

const NewDiaryContainer = styled("div")({
  width: "90vw",
  marginLeft: 10,
  marginRight: 10,
  paddingTop: 20,
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const NewDiaryForm = styled("form")({});

const ControlContainer = styled("div")({
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  position: "fixed",
  marginLeft: "auto",
  bottom: 60,
});

const ImageControlContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "10px",
  paddingBottom: "10px",
});

const NewDiary = () => {
  const { t } = useTranslation();

  const { user, settings } = useContext(settingsContext);
  const { fileMetadata, openFilePicker, getAuthImgUrl } = useFilestack();

  let defaultDiaryContent = localStorage.getItem("diaryDraft");
  if (!defaultDiaryContent) defaultDiaryContent = "";
  const [newDiaryContent, setNewDiaryContent] = useState(defaultDiaryContent);
  const [submitted, setSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [submissionAlertState, setSubmissionAlertState] = useState(false);
  const [author, setAuthor] = useState("");

  const [imageUploaded, setImageUploaded] = useState(false);
  let navigate = useNavigate();

  const handleChange = (event) => {
    localStorage.setItem("diaryDraft", event.target.value);
    setNewDiaryContent(event.target.value);
  };

  const selectImageFile = async (e) => {
    e.preventDefault();
    await openFilePicker(() => {
      setImageUploaded(true);
    });
  };

  const submitDiary = async () => {
    const time = getCurrentTimestamp();
    setSubmitted(true);
    setWarningMessage(t("saving.label"));
    try {
      let photos = [];

      // const fileMetadata = getFileMetadata();
      const imageType = ["image/jpeg", "image/jpg", "image/png"];
      if (fileMetadata && imageType.includes(fileMetadata.mimetype)) {
        photos.push(fileMetadata.handle);
      }
      const newDiary = {
        content: newDiaryContent,
        time,
        author,
        photos,
        reply: [],
      };

      await addNewDiary(newDiary);
      setWarningMessage(t("saved.label"));
      localStorage.removeItem("diaryDraft");
      navigate("/diarys");
    } catch (error) {
      setWarningMessage(t("save_failed.label") + error);
    }
  };
  return (
    <GlassFullContainer>
      <NewDiaryForm noValidate autoComplete="off">
        <NewDiaryContainer>
          <TextField
            // fullWidth
            size="small"
            onChange={handleChange}
            label={t("new_diary.label")}
            placeholder={t("new_diary_placeholder.label")}
            multiline
            variant="outlined"
            maxRows={(window.innerHeight - 56) / 23}
            value={newDiaryContent}
            helperText={warningMessage}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "8px solid white",
            }}
          />
          <ImageControlContainer>
            <Button
              component="label"
              size="small"
              variant="contained"
              color="primary"
              onClick={(e) => {
                selectImageFile(e);
              }}
            >
              {t("add_photo.label")}
            </Button>
          </ImageControlContainer>

          {imageUploaded && (
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={getAuthImgUrl(fileMetadata.handle)}
                />
              </CardActionArea>
            </Card>
          )}
          {!submitted && (
            <ControlContainer>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  setAuthor(user);
                  setSubmissionAlertState(true);
                }}
              >
                {t("submit.label")}
              </Button>
            </ControlContainer>
          )}
        </NewDiaryContainer>
      </NewDiaryForm>
      {submissionAlertState && (
        <ConfirmModal
          confirmTitle={settings[user].nickname}
          confirmDescription={t("submit_confirm.label")}
          cancel={() => setSubmissionAlertState(false)}
          confirm={submitDiary}
        />
      )}
    </GlassFullContainer>
  );
};

export default NewDiary;
