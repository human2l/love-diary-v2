import { Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { settingsContext } from "../app";
import writingPng from "../assets/images/writing.png";
import buttonMp3 from "../assets/sounds/button.mp3";
import { Diary } from "../components/diary";
import PageLoading from "../components/pageLoading";
import TopSnackbar from "../components/topSnackbar";
import { getAllDiarys } from "../services/airtable/diaryService";
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
  const { user, getPartner, settings } = useContext(settingsContext);
  let navigate = useNavigate();
  const [play] = useSound(buttonMp3, {
    volume: 0.5,
  });

  const fetchAllDiarys = async () => {
    const coupleIds = [settings[user].id, settings[getPartner()].id];
    const allDiarys = await getAllDiarys(coupleIds);
    return allDiarys;
  };

  const {
    isLoading,
    isFetching,
    data: diarys,
    isError,
    error,
  } = useQuery("fetchAllDiarys", fetchAllDiarys);

  if (isError) console.error(error);

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <LoveDiaryContainer>
          <DiarysContainer>
            {isFetching && (
              <TopSnackbar message={t("updating_new_diary.label")} />
            )}
            {diarys.length ? (
              diarys.map((diary) => {
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
              })
            ) : (
              <Typography
                variant="h5"
                color="secondary"
                sx={{ pt: "50%", textAlign: "center" }}
              >
                You haven't written any diary.
              </Typography>
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
