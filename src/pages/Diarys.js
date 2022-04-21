import { useState, useEffect } from "react";
import { Diary } from "../components/Diary";
import { styled } from "@mui/material/styles";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import { getAllDiarys } from "../services/airtable";
import { getUserInfo } from "../services/user_service";
import { getCountryDateFromTimestamp } from "../utils/date_utils";

const DiarysContainer = styled("div")({
  marginLeft: 10,
  marginRight: 10,
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
      {isLoading && <img src={loadingHeartsSvg} alt="loading" />}
      {diarys.map((diary) => {
        const { key, author, content = "", time, reply, photos } = diary;

        const diaryDate = getCountryDateFromTimestamp(
          time,
          getUserInfo(author)?.country
        );

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
