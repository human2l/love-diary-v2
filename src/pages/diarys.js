import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import { Diary } from "../components/diary";
import PageLoading from "../components/pageLoading";
import TopSnackbar from "../components/topSnackbar";
import { getAllDiarys } from "../services/airtable";
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
  const { settings } = useContext(settingsContext);
  let navigate = useNavigate();

  const fetchAllDiarys = async () => {
    const allDiarys = await getAllDiarys();

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
            {diarys.map((diary) => {
              const { key, author, content = "", time, reply, photos } = diary;

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
          </DiarysContainer>
        </LoveDiaryContainer>
      )}
      <AddNewDiaryButton
        color="primary"
        aria-label="edit"
        onClick={() => {
          navigate("/new_diary");
        }}
      >
        <EditIcon />
      </AddNewDiaryButton>
    </>
  );
};

export default Diarys;
