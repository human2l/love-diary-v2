import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { useInViewport } from "ahooks";
import { t } from "i18next";
import React, { useContext, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { settingsContext } from "../app";
import writingPng from "../assets/images/writing.png";
import buttonMp3 from "../assets/sounds/button.mp3";
import { Diary } from "../components/diary";
import PageLoading from "../components/pageLoading";
import { getDiarysPaginated } from "../services/airtable/diaryService";
import { getCountryDateFromTimestamp } from "../utils/date_utils";
const LoveDiaryContainer = styled("div")({
  // boxSizing: "border-box",
  marginLeft: 8,
  marginRight: 8,
  paddingBottom: 65,
  // maxWidth: 500,
  display: "flex",
  flexDirection: "column",
});

const DiarysContainer = styled("div")({});

const AddNewDiaryButton = styled(Fab)({
  position: "fixed",
  bottom: 70,
  right: 15,
});

const Diarys = () => {
  const { user, partner, settings } = useContext(settingsContext);
  let navigate = useNavigate();
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    ["fetchAllDiarys", settings[user].id, settings[partner].id],
    async ({ pageParam = null }) => {
      const coupleIds = [settings[user].id, settings[partner].id];
      return await getDiarysPaginated(coupleIds, pageParam);
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextOffset || undefined,
    }
  );

  const loaderRef = useRef(null);
  const [inViewport] = useInViewport(loaderRef);

  useEffect(() => {
    if (inViewport && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inViewport, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) console.error(error);

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <LoveDiaryContainer>
          <DiarysContainer>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((diary) => {
                  const {
                    key,
                    author,
                    content = "",
                    time,
                    reply,
                    photos,
                  } = diary;

                  const diaryDate = getCountryDateFromTimestamp(
                    time,
                    settings[author].country
                  );

                  return (
                    <Diary
                      key={key}
                      diaryKey={key}
                      diaryAuthor={author}
                      diaryDate={diaryDate}
                      diaryContent={content}
                      diaryReplies={reply}
                      diaryPhotos={photos}
                    />
                  );
                })}
              </React.Fragment>
            ))}
            {data?.pages[0]?.data.length === 0 && (
              <Typography
                variant="h5"
                color="secondary"
                sx={{ pt: "50%", textAlign: "center" }}
              >
                You haven't written any diary.
              </Typography>
            )}
            {hasNextPage && (
              <div ref={loaderRef} style={{ marginTop: 10, paddingBottom: 20 }}>
                 <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      gutterBottom
                      sx={{ textAlign: "center" }}
                    >
                      {t("loading.label")}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )}
          </DiarysContainer>
        </LoveDiaryContainer>
      )}
      <AddNewDiaryButton
        color="primary"
        aria-label="edit"
        onClick={() => {
          play();
          navigate("/new_diary");
        }}
      >
        <img src={writingPng} height={30} width={30} alt="writing-icon" />
      </AddNewDiaryButton>
    </>
  );
};

export default Diarys;
