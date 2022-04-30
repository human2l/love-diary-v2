import { useContext } from "react";
import { Diary } from "../components/Diary";
import { styled } from "@mui/material/styles";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import { getAllDiarys } from "../services/airtable";
import { getCountryDateFromTimestamp } from "../utils/date_utils";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../App";
import { QueryClient, useQuery } from "react-query";
import LoadingCard from "../components/LoadingCard";

const queryClient = new QueryClient();

const LoveDiaryContainer = styled("div")({
  marginLeft: 10,
  marginRight: 10,
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
});

const DiarysContainer = styled("div")({});

const AddNewDiaryButton = styled(Fab)({
  position: "fixed",
  bottom: 70,
  right: 15,
});

export const Diarys = () => {
  const { settings } = useContext(settingsContext);
  let navigate = useNavigate();

  const fetchAllDiarys = async () => {
    const allDiarys = await getAllDiarys();
    const orderedDiarys = allDiarys.sort((diaryA, diaryB) =>
      diaryA.time < diaryB.time ? 1 : -1
    );
    return orderedDiarys;
  };

  const {
    isLoading,
    isFetching,
    data: diarys,
    isError,
    error,
  } = useQuery("fetchAllDiarys", () => fetchAllDiarys());

  if (isError) console.error(error);

  const onUpdateDiary = (editedDiary) => {
    queryClient.invalidateQueries("fetchAllDiarys");
  };

  return (
    <LoveDiaryContainer>
      {isLoading ? (
        <img src={loadingHeartsSvg} alt="loading" />
      ) : (
        <DiarysContainer>
          {isFetching && <LoadingCard />}
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
                onUpdateDiary={onUpdateDiary}
              />
            );
          })}
        </DiarysContainer>
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
    </LoveDiaryContainer>
  );
};
