import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { settingsContext } from "../app";
import childrenPng from "../assets/images/children.png";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import FlyingHeart from "../components/flyingHeart/flyingHeart";
import { getDiaryCountByUser } from "../services/airtable";
import { timeDiff } from "../utils/date_utils";

const DashboardContainer = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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

const Dashboard = () => {
  const { t } = useTranslation();
  const { settings } = useContext(settingsContext);
  const { isLoading: isLoadingKaiDiaryCount, data: kaiDiaryCount } = useQuery(
    "updateKaiDiaryCount",
    () => getDiaryCountByUser("Kai")
  );
  const { isLoading: isLoadingDanDiaryCount, data: danDiaryCount } = useQuery(
    "updateDanDiaryCount",
    () => getDiaryCountByUser("Dan")
  );

  let res = timeDiff(new Date(), new Date("2020-02-14 00:00:00"));

  return (
    <DashboardContainer>
      {isLoadingKaiDiaryCount || isLoadingDanDiaryCount ? (
        <img src={loadingHeartsSvg} alt="loading" />
      ) : (
        <>
          <FlyingHeart />
          <Image src={childrenPng} />
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
      {/* <a href="https://www.flaticon.com/free-icons/children" title="children icons">Children icons created by Freepik - Flaticon</a> */}
    </DashboardContainer>
  );
};

export default Dashboard;
