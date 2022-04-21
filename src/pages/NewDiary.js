import { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { addNewDiary } from "../services/airtable";
import {
  getAuthImgUrl,
  getFileMetadata,
  openFilePicker,
} from "../services/filestack";
import { getUser, getUserInfo } from "../services/userService";
import { getCurrentTimestamp } from "../utils/dateUtils";

const NewDiaryContainer = styled("div")({
  marginLeft: 10,
  marginRight: 10,
  paddingTop: 20,
  paddingBottom: 65,
});

const NewDiaryForm = styled("form")({});

const DiaryTextField = styled(TextField)({
  width: "100%",
});

const ControlContainer = styled("div")({
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  position: "fixed",
  marginLeft: "auto",
  bottom: 60,
});

const SubmissionAlertModalContent = styled("div")({
  padding: 20,
  marginTop: 50,
  width: "70%",
  margin: "auto",
  background: "rgba(255,255,255,0.6)",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
});

const ImageControlContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "10px",
  paddingBottom: "10px",
});

export const NewDiary = () => {
  let defaultDiaryContent = localStorage.getItem("diaryDraft");
  if (!defaultDiaryContent) defaultDiaryContent = "";

  const [newDiaryContent, setNewDiaryContent] = useState(defaultDiaryContent);
  const [submitted, setSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [submissionAlertState, setSubmissionAlertState] = useState(false);
  const [author, setAuthor] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleChange = (event) => {
    localStorage.setItem("diaryDraft", event.target.value);
    setNewDiaryContent(event.target.value);
  };

  const showSubmissionAlert = () => {
    setSubmissionAlertState(true);
  };

  const hideSubmissionAlert = () => {
    setSubmissionAlertState(false);
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
    setWarningMessage("正在保存...请不要乱动🐶");
    try {
      let photos = [];

      const fileMetadata = getFileMetadata();
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
      setWarningMessage("已保存");
      localStorage.removeItem("diaryDraft");
    } catch (error) {
      setWarningMessage("保存失败，原因：" + error);
    }
  };
  return (
    <NewDiaryContainer>
      <NewDiaryForm noValidate autoComplete="off">
        <DiaryTextField
          onChange={handleChange}
          label="新的心情"
          placeholder="写点什么好呢"
          multiline
          variant="outlined"
          maxRows={(window.innerHeight - 56) / 23}
          value={newDiaryContent}
          helperText={warningMessage}
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
            添加图片
          </Button>
        </ImageControlContainer>

        {imageUploaded && (
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={getAuthImgUrl(getFileMetadata().handle)}
              />
            </CardActionArea>
          </Card>
        )}
        {!submitted && (
          <ControlContainer>
            <Button
              size="large"
              variant="contained"
              color={getUserInfo(getUser())?.color}
              onClick={() => {
                setAuthor(getUser());
                showSubmissionAlert();
              }}
            >
              {getUserInfo(getUser())?.chineseName}写好了
            </Button>
          </ControlContainer>
        )}
      </NewDiaryForm>
      <Modal
        open={submissionAlertState}
        onClose={hideSubmissionAlert}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <SubmissionAlertModalContent>
          <Typography
            color={getUserInfo(getUser())?.color}
            variant="h5"
            id="simple-modal-title"
          >
            {getUserInfo(author)?.chineseName}
          </Typography>
          <Typography color="textSecondary" id="simple-modal-description">
            你确定写好了吗？
          </Typography>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              size="medium"
              variant="contained"
              color="inherit"
              onClick={hideSubmissionAlert}
            >
              取消
            </Button>
            <Button
              size="medium"
              variant="contained"
              color={getUserInfo(getUser())?.color}
              onClick={() => {
                hideSubmissionAlert();
                submitDiary();
              }}
            >
              确定
            </Button>
          </div>
        </SubmissionAlertModalContent>
      </Modal>
    </NewDiaryContainer>
  );
};
