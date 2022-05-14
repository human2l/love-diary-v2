import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import ConfirmModal from "../components/confirmModal";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import useFilestack from "../hooks/useFilestack";
import useLocalStorage from "../hooks/useLocalStorage";
import { addNewDiary } from "../services/airtable/diaryService";
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
  const { t, user, settings } = useContext(settingsContext);
  const { fileMetadata, openFilePicker, getAuthImgUrl } = useFilestack();
  const [diaryContent, setDiaryContent] = useLocalStorage("diaryDraft", "");

  const [warningMessage, setWarningMessage] = useState("");
  const [submissionAlertState, setSubmissionAlertState] = useState(false);

  const [imageUploaded, setImageUploaded] = useState(false);
  let navigate = useNavigate();

  const handleChange = (event) => {
    setDiaryContent(event.target.value);
  };

  const selectImageFile = async (e) => {
    e.preventDefault();
    await openFilePicker(() => {
      setImageUploaded(true);
    });
  };

  const submitDiary = async () => {
    const time = getCurrentTimestamp();
    setWarningMessage(t("saving.label"));
    try {
      let photos = [];
      const imageType = ["image/jpeg", "image/jpg", "image/png"];
      if (fileMetadata && imageType.includes(fileMetadata.mimetype)) {
        photos.push(fileMetadata.handle);
      }
      const newDiary = {
        content: diaryContent,
        time,
        author: user,
        photos,
        reply: [],
      };

      await addNewDiary(newDiary);
      setWarningMessage(t("saved.label"));
      setDiaryContent("");
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
            inputProps={{
              autoComplete: "off",
            }}
            size="small"
            onChange={handleChange}
            label={t("new_diary.label")}
            placeholder={t("new_diary_placeholder.label")}
            multiline
            variant="outlined"
            maxRows={(window.innerHeight - 65) / 23}
            value={diaryContent}
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
          <ControlContainer>
            <Button
              disabled={!diaryContent.length}
              size="large"
              variant="contained"
              onClick={() => {
                setSubmissionAlertState(true);
              }}
            >
              {t("submit.label")}
            </Button>
          </ControlContainer>
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
