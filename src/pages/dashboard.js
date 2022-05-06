import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { settingsContext } from "../app";
import childrenPng from "../assets/images/children.png";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import CartoonNumbers from "../components/cartoonNumbers";
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

const CartoonNumbersContainer = styled("div")({
  margin: 20,
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
  const personASettings = Object.values(settings)[0];
  const personBSettings = Object.values(settings)[1];

  const { isLoading: isLoadingPersonADiaryCount, data: personADiaryCount } =
    useQuery("updatePersonADiaryCount", () =>
      getDiaryCountByUser(personASettings.name)
    );
  const { isLoading: isLoadingPersonBDiaryCount, data: personBDiaryCount } =
    useQuery("updatePersonBDiaryCount", () =>
      getDiaryCountByUser(personBSettings.name)
    );

  let res = timeDiff(new Date(), new Date("2020-02-14 00:00:00"));

  return (
    <DashboardContainer>
      {isLoadingPersonBDiaryCount || isLoadingPersonADiaryCount ? (
        <img src={loadingHeartsSvg} alt="loading" />
      ) : (
        <>
          <FlyingHeart />
          <Image src={childrenPng} />
          <Typography color="textPrimary" variant="h5">
            {personASettings.nickname}
            {t("and.label")}
            {personBSettings.nickname}
          </Typography>
          <DaysCounterContainer>
            <Typography color="textPrimary" variant="h5">
              {t("have_been_together_for.label")}
            </Typography>
            <DaysWrapper>
              <RedTypography color="primary" variant="h3">
                <CartoonNumbersContainer>
                  <CartoonNumbers numberString={res.day + ""} />
                </CartoonNumbersContainer>
              </RedTypography>
            </DaysWrapper>
            <Typography color="textPrimary" variant="h5">
              {t("days.label")}
            </Typography>
          </DaysCounterContainer>
          <DiaryCounterContainer>
            <Typography color={personASettings.primaryColor} variant="h5">
              {personASettings.nickname}
              {t("wrote.label")}
              {Math.floor(
                (personADiaryCount / (personADiaryCount + personBDiaryCount)) *
                  100
              )}
              % {t("of_diaries.label")}
            </Typography>
            <Typography color={personASettings.primaryColor} variant="h5">
              {t("total.label.omit")}
              {personADiaryCount}
              {t("total.label")}
            </Typography>
            <Typography color={personBSettings.primaryColor} variant="h5">
              {personBSettings.nickname}
              {t("wrote.label")}
              {Math.floor(
                (personBDiaryCount / (personADiaryCount + personBDiaryCount)) *
                  100
              )}
              % {t("of_diaries.label")}
            </Typography>
            <Typography color={personBSettings.primaryColor} variant="h5">
              {t("total.label.omit")}
              {personBDiaryCount}
              {t("total.label")}
            </Typography>
          </DiaryCounterContainer>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
