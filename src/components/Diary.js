import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

import { useState, useContext } from "react";

import { updateDiaryReply } from "../services/airtable";
import { getAuthImgUrl } from "../services/filestack";
import {
  getCurrentTimestamp,
  getCountryDateFromTimestamp,
} from "../utils/date_utils";
import { settingsContext } from "../App";

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

const ContentDivider = styled(Divider)({});

const PhotoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const Diary = (props) => {
  const {
    diaryAuthor,
    diaryContent,
    diaryDate,
    diaryKey,
    diaryReplys,
    diaryPhotos,
    fetchAllDiarys,
  } = props;

  const { user, settings } = useContext(settingsContext);

  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

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
        ...diaryReplys,
        {
          author,
          content: replyContent,
          time,
        },
      ];
      await updateDiaryReply(diaryKey, reply);
      fetchAllDiarys();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplyPanel = () => {
    setReply(!reply);
  };

  const diaryReplysView = diaryReplys.map((diaryReply, index) => {
    return (
      <div key={index} style={{ paddingLeft: 10 }}>
        <ContentDivider variant="fullWidth" />
        <TitleContainer>
          <Typography
            color={settings[diaryReply.author].primaryColor}
            gutterBottom
          >
            {settings[diaryReply.author].nickName}
          </Typography>
          <DiaryMetaContainer>
            <Typography color="textSecondary">
              {getCountryDateFromTimestamp(
                diaryReply.time,
                settings[diaryReply.author].country
              )}
            </Typography>
          </DiaryMetaContainer>
        </TitleContainer>
        <Typography
          color={settings[diaryReply.author].primaryColor}
          variant="body2"
          component="p"
          gutterBottom
        >
          {convertToParagraph(diaryReply.content)}
        </Typography>
      </div>
    );
  });

  const replyControlsView = (
    <ReplyContainer>
      <TextField
        label="回复："
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
        {settings[user].nickName}回复
      </Button>
    </ReplyContainer>
  );

  return (
    <CardContainer>
      <Card>
        <CardContent>
          <TitleContainer>
            <Typography
              variant="h5"
              color={settings[diaryAuthor].primaryColor}
              gutterBottom
            >
              {settings[diaryAuthor].nickName}
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

          {diaryReplysView}

          {reply && replyControlsView}
        </CardContent>
      </Card>
    </CardContainer>
  );
};
