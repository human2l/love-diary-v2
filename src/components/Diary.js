import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

import { useState, useContext } from "react";

import { updateDiaryReply } from "../services/airtable";
import useFilestack from "../hooks/useFilestack";
import { getCurrentTimestamp } from "../utils/date_utils";
import { settingsContext } from "../App";
import DiaryReply from "./DiaryReply";
import { useTranslation } from "react-i18next";

const CardContainer = styled(Card)({
  marginTop: 10,
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const DiaryMetaContainer = styled("div")({
  display: "flex",
});

const ReplyContainer = styled("div")({
  display: "flex",
});

const PhotoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const Diary = (props) => {
  const { t } = useTranslation();

  const {
    diaryAuthor,
    diaryContent,
    diaryDate,
    diaryKey,
    diaryReplies,
    diaryPhotos,
    onUpdateDiary,
  } = props;

  const { user, settings } = useContext(settingsContext);

  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { getAuthImgUrl } = useFilestack();

  const convertToParagraph = (text) => {
    return text.split("\n").map((line, index) => {
      return (
        <span key={line + index}>
          {line}
          <br />
        </span>
      );
    });
  };

  const editReply = (event) => {
    setReplyContent(event.target.value);
  };

  const submitReply = async (author) => {
    setReply(false);
    if (replyContent === "") return;
    const time = getCurrentTimestamp();
    try {
      const reply = [
        ...diaryReplies,
        {
          author,
          content: replyContent,
          time,
        },
      ];
      await updateDiaryReply(diaryKey, reply, onUpdateDiary);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplyPanel = () => {
    setReply(!reply);
  };

  const diaryRepliesView = diaryReplies.map((diaryReply, index) => {
    return (
      <div key={index} style={{ paddingLeft: 10 }}>
        <DiaryReply
          color={settings[diaryReply.author].primaryColor}
          nickname={settings[diaryReply.author].nickname}
          time={diaryReply.time}
          country={settings[diaryReply.author].country}
          content={diaryReply.content}
          convertToParagraph={convertToParagraph}
        />
      </div>
    );
  });

  const replyControlsView = (
    <ReplyContainer>
      <TextField
        label={t("reply_with_colon.label")}
        multiline
        variant="standard"
        style={{ width: "100%" }}
        value={replyContent}
        onChange={editReply}
      />
      <Button
        variant="contained"
        onClick={() => submitReply(user)}
        style={{ width: "auto", height: "40px", whiteSpace: "nowrap" }}
      >
        {t("reply.label")}
      </Button>
    </ReplyContainer>
  );

  return (
    <CardContainer>
      <Card sx={{ backgroundColor: "white" }}>
        <CardContent>
          <TitleContainer>
            <Typography
              variant="h5"
              color={settings[diaryAuthor].primaryColor}
              gutterBottom
            >
              {settings[diaryAuthor].nickname}
            </Typography>
            <DiaryMetaContainer>
              <Typography color="textSecondary">{diaryDate}</Typography>
              <MessageIcon color="secondary" onClick={toggleReplyPanel} />
            </DiaryMetaContainer>
          </TitleContainer>
          <Typography
            color={settings[diaryAuthor].primaryColor}
            variant="body1"
            component="p"
            gutterBottom
          >
            {convertToParagraph(diaryContent)}
          </Typography>
          <PhotoContainer>
            {diaryPhotos.length > 0 && (
              <div>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={getAuthImgUrl(diaryPhotos[0])}
                      style={{ height: "auto", width: "100%" }}
                    />
                  </CardActionArea>
                </Card>
              </div>
            )}
          </PhotoContainer>

          {diaryRepliesView}

          {reply && replyControlsView}
        </CardContent>
      </Card>
    </CardContainer>
  );
};
