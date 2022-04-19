import { useState, useEffect } from "react";
import { Diary } from "../components/Diary";
import { styled } from "@mui/material/styles";
import { getTimeString } from "../utils/DateUtils";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllDiarys } from "../utils/airtable";

const DiarysContainer = styled("div")({
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
});

export const Diarys = () => {
  const [diarys, setDiarys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllDiarys = async () => {
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
  };
  useEffect(() => {
    fetchAllDiarys();
  }, []);
  return (
    <DiarysContainer>
      {isLoading && (
        <CircularProgress color="secondary" style={{ margin: "auto" }} />
      )}
      {diarys.map((diary) => {
        const {
          key,
          author,
          content = "",
          minute,
          hour,
          day,
          month,
          year,
          reply,
          photos,
        } = diary;
        const diaryDate = getTimeString(author, minute, hour, day, month, year);

        return (
          <Diary
            key={key}
            diaryKey={key}
            diaryAuthor={author}
            diaryDate={diaryDate}
            diaryContent={content}
            diaryReplys={reply}
            diaryPhotos={photos}
            fetchAllDiarys={fetchAllDiarys}
          />
        );
      })}
    </DiarysContainer>
  );
};
