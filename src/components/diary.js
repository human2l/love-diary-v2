import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { settingsContext } from "../app";
import useFilestack from "../hooks/useFilestack";
import { updateDiaryReply } from "../services/airtable";
import { getCurrentTimestamp } from "../utils/date_utils";
import DiaryReply from "./diaryReply";

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
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const {
    diaryAuthor,
    diaryContent,
    diaryDate,
    diaryKey,
    diaryReplies,
    diaryPhotos,
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

  const submitReply = useMutation(() => {
    setReply(false);
    if (replyContent === "") return;
    const time = getCurrentTimestamp();
    const reply = [
      ...diaryReplies,
      {
        author: user,
        content: replyContent,
        time,
      },
    ];

    updateDiaryReply(diaryKey, reply, () => {
      queryClient.invalidateQueries("fetchAllDiarys");
      setReplyContent("");
    });
  });

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
        variant="standard"
        style={{ width: "100%" }}
        value={replyContent}
        onInput={(e) => setReplyContent(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={submitReply.mutate}
        style={{ width: "auto", height: "40px", whiteSpace: "nowrap" }}
      >
        {t("reply.label")}
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
              {settings[diaryAuthor].nickname}
            </Typography>
            <DiaryMetaContainer>
              <Typography color="textSecondary">{diaryDate}</Typography>
              <ChatOutlinedIcon color="secondary" onClick={toggleReplyPanel} />
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
