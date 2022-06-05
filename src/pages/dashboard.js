import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useQuery } from "react-query";
import { settingsContext } from "../app";
import childrenPng from "../assets/images/children.png";
import CartoonNumbers from "../components/cartoonNumbers";
import FlyingHeart from "../components/flyingHeart/flyingHeart";
import GlassRoundContainer from "../components/glassmorphism/glassRoundContainer";
import PageLoading from "../components/pageLoading";
import { getDiaryCountByUser } from "../services/airtable/diaryService";
import { timeDiff } from "../utils/date_utils";

const DashboardContainer = styled("div")({
  boxSizing: "border-box",
  paddingTop: 30,
  marginLeft: "auto",
  marginRight: "auto",
  width: "90%",
  height: "100%",
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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
  marginBottom: 20,
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
  const { t, user, partner, settings } = useContext(settingsContext);

  const { isLoading: isLoadinguserDiaryCount, data: userDiaryCount } = useQuery(
    "updateuserDiaryCount",
    () => getDiaryCountByUser(settings[user].id)
  );
  const { isLoading: isLoadingpartnerDiaryCount, data: partnerDiaryCount } =
    useQuery("updatepartnerDiaryCount", () =>
      getDiaryCountByUser(settings[partner].id)
    );

  const userDiaryRate = Math.floor(
    (userDiaryCount / (userDiaryCount + partnerDiaryCount)) * 100
  );

  const partnerDiaryRate = Math.floor(
    (partnerDiaryCount / (userDiaryCount + partnerDiaryCount)) * 100
  );

  let res = timeDiff(new Date(), new Date("2020-02-14 00:00:00"));

  return (
    <>
      {isLoadingpartnerDiaryCount || isLoadinguserDiaryCount ? (
        <PageLoading />
      ) : (
        <DashboardContainer>
          <GlassRoundContainer>
            <ContentContainer>
              <FlyingHeart />
              <Image src={childrenPng} />
              <Typography
                color="textPrimary"
                variant="h5"
                sx={{ textAlign: "center" }}
              >
                {settings[user].nickname}
                {t("and.label")}
                {settings[partner].nickname}
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
                <Typography color={settings[user].primaryColor} variant="h5">
                  {settings[user].nickname}
                  {t("wrote.label")}
                  {isNaN(userDiaryRate) ? 0 : userDiaryRate}%{" "}
                  {t("of_diaries.label")}
                </Typography>
                <Typography color={settings[user].primaryColor} variant="h5">
                  {t("total.label.omit")}
                  {userDiaryCount}
                  {t("total.label")}
                </Typography>
                <Typography color={settings[partner].primaryColor} variant="h5">
                  {settings[partner].nickname}
                  {t("wrote.label")}
                  {isNaN(partnerDiaryRate) ? 0 : partnerDiaryRate}%{" "}
                  {t("of_diaries.label")}
                </Typography>
                <Typography color={settings[partner].primaryColor} variant="h5">
                  {t("total.label.omit")}
                  {partnerDiaryCount}
                  {t("total.label")}
                </Typography>
              </DiaryCounterContainer>
            </ContentContainer>
          </GlassRoundContainer>
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;
