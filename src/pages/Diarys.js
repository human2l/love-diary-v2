import { useState, useEffect, useContext } from "react";
import { Diary } from "../components/Diary";
import { styled } from "@mui/material/styles";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import useAirtable from "../hooks/useAirtable";
import { getCountryDateFromTimestamp } from "../utils/date_utils";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../App";

const DiarysContainer = styled("div")({
  marginLeft: 10,
  marginRight: 10,
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
});

const AddNewDiaryButton = styled(Fab)({
  position: "fixed",
  bottom: 70,
  right: 15,
});

export const Diarys = () => {
  const { getAllDiarys } = useAirtable();
  const { settings } = useContext(settingsContext);
  let navigate = useNavigate();
  const [diarys, setDiarys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateDiary = (editedDiary) => {
    const updatedDiarys = diarys.map((diary) => {
      if (diary.key === editedDiary.key) {
        return editedDiary;
      }
      return diary;
    });
    setDiarys(updatedDiarys);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const allDiarys = await getAllDiarys();
        const orderedDiarys = allDiarys.sort((diaryA, diaryB) =>
          diaryA.time < diaryB.time ? 1 : -1
        );
        setDiarys(orderedDiarys);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, [getAllDiarys]);

  return (
    <DiarysContainer>
      {isLoading && <img src={loadingHeartsSvg} alt="loading" />}
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
      <AddNewDiaryButton
        color="primary"
        aria-label="edit"
        onClick={() => {
          navigate("/new_diary");
        }}
      >
        <EditIcon />
      </AddNewDiaryButton>
    </DiarysContainer>
  );
};
