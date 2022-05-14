import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import useSound from "use-sound";
import { settingsContext } from "../app";
import sayLovePng from "../assets/images/say_love.png";
import sendPng from "../assets/images/send.png";
import sendSound from "../assets/sounds/send.mp3";
import useFilestack from "../hooks/useFilestack";
import useLocalStorage from "../hooks/useLocalStorage";
import useTypingSound from "../hooks/useTypingSound";
import { updateDiaryReply } from "../services/airtable/diaryService";
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
  justifyContent: "center",
});

const PhotoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const CommentIcon = styled("img")({
  width: 40,
  height: 40,
});

const SendIcon = styled("img")({
  width: 48,
  height: 48,
});

export const Diary = (props) => {
  const queryClient = useQueryClient();
  const [play] = useSound(sendSound, {
    volume: 0.5,
  });

  const {
    diaryAuthor,
    diaryContent,
    diaryDate,
    diaryKey,
    diaryReplies,
    diaryPhotos,
  } = props;
  const { t } = useContext(settingsContext);

  const [playTypingSound] = useTypingSound();

  const { user, settings } = useContext(settingsContext);

  const [reply, setReply] = useState(false);

  const [replyContent, setReplyContent] = useLocalStorage("replyDraft", "");
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

  const handleChangeReply = (e) => {
    setReplyContent(e.target.value);
    playTypingSound();
  };

  const submitReply = useMutation(() => {
    setReply(false);
    if (replyContent === "") return;
    play();
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
      {reply ? (
        <>
          <TextField
            inputProps={{
              autoComplete: "off",
            }}
            label={t("reply_with_colon.label")}
            variant="standard"
            fullWidth
            value={replyContent}
            onChange={handleChangeReply}
          />
          <Button
            variant="text"
            size="small"
            sx={{
              borderRadius: 10,
            }}
            onClick={submitReply.mutate}
          >
            <SendIcon src={sendPng} />
          </Button>
        </>
      ) : (
        <Button
          variant="text"
          size="small"
          sx={{
            borderRadius: 10,

            height: 48, // equal to textField height
          }}
          onClick={toggleReplyPanel}
        >
          <CommentIcon src={sayLovePng} />
        </Button>
      )}
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

          {replyControlsView}
        </CardContent>
      </Card>
    </CardContainer>
  );
};
