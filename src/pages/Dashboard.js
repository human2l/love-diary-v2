import { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import loveImage from "../assets/images/love_icon.png";
import useAirtalbe from "../hooks/useAirtable";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import { settingsContext } from "../App";
import FlyingHeart from "../components/FlyingHeart/FlyingHeart";
import { useTranslation } from "react-i18next";

const howLong = (time1, time2) => {
  time1 = time1.getTime();
  time2 = time2.getTime();
  let cha = time1 > time2 ? time1 - time2 : time2 - time1;
  let day = Math.floor(cha / (24 * 3600 * 1000));
  let hours = Math.floor((cha % (24 * 3600 * 1000)) / (3600 * 1000));
  let minutes = Math.floor(
    ((cha % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000)
  );
  let seconds = Math.floor(
    (((cha % (24 * 3600 * 1000)) % (3600 * 1000)) % (60 * 1000)) / 1000
  );
  return {
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

const DashboardContainer = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //   backgroundImage:
  //     "url('https://i.pinimg.com/564x/be/dc/52/bedc522cdab3546780880b53096e4caa.jpg')",
  //   backgroundSize: "cover",
});

const DaysCounterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
});

const DiaryCounterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const Image = styled("img")({
  marginTop: 50,
  width: "auto",
  height: "auto",
  maxWidth: 100,
  maxHeight: 100,
});

const DaysWrapper = styled("div")({});

const RedTypography = styled(Typography)({
  color: "#f44336",
});

export const Dashboard = () => {
  const { t } = useTranslation();

  const { settings } = useContext(settingsContext);
  const { getDiaryCountByUser } = useAirtalbe();
  const [isLoading, setIsLoading] = useState(true);
  const [kaiDiaryCount, setKaiDiaryCount] = useState(0);
  const [danDiaryCount, setDanDiaryCount] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const updateDiaryCount = async () => {
      setKaiDiaryCount(await getDiaryCountByUser("Kai"));
      setDanDiaryCount(await getDiaryCountByUser("Dan"));
      setIsLoading(false);
    };
    updateDiaryCount();
  }, [getDiaryCountByUser]);

  let res = howLong(new Date(), new Date("2020-02-14 00:00:00"));

  return (
    <DashboardContainer>
      {isLoading ? (
        <img src={loadingHeartsSvg} alt="loading" />
      ) : (
        <>
          <FlyingHeart />
          <Image src={loveImage} />
          <Typography color="textPrimary" variant="h5">
            {settings.Dan.nickname}
            {t("and.label")}
            {settings.Kai.nickname}
          </Typography>
          {/* <Typography color="textPrimary" variant="h5">
            从2020年2月14日在一起
          </Typography> */}
          <DaysCounterContainer>
            <Typography color="textPrimary" variant="h5">
              {t("have_been_together_for.label")}
            </Typography>
            <DaysWrapper>
              <RedTypography color="primary" variant="h3">
                {res.day}
              </RedTypography>
            </DaysWrapper>
            <Typography color="textPrimary" variant="h5">
              {t("days.label")}
            </Typography>
          </DaysCounterContainer>
          <DiaryCounterContainer>
            <Typography color={settings.Dan.primaryColor} variant="h5">
              {settings.Dan.nickname}
              {t("wrote.label")}
              {Math.floor(
                (danDiaryCount / (danDiaryCount + kaiDiaryCount)) * 100
              )}
              % {t("of_diaries.label")}
            </Typography>
            <Typography color={settings.Dan.primaryColor} variant="h5">
              {t("total.label.omit")}
              {danDiaryCount}
              {t("total.label")}
            </Typography>
            <Typography color={settings.Kai.primaryColor} variant="h5">
              {settings.Kai.nickname}
              {t("wrote.label")}
              {Math.floor(
                (kaiDiaryCount / (danDiaryCount + kaiDiaryCount)) * 100
              )}
              % {t("of_diaries.label")}
            </Typography>
            <Typography color={settings.Kai.primaryColor} variant="h5">
              {t("total.label.omit")}
              {kaiDiaryCount}
              {t("total.label")}
            </Typography>
          </DiaryCounterContainer>
        </>
      )}
    </DashboardContainer>
  );
};
