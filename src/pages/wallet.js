import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import useSound from "use-sound";
import { settingsContext } from "../app";
import coinsPng from "../assets/images/coins.png";
import moneyHeartPng from "../assets/images/money_heart.png";
import ahOhSound from "../assets/sounds/ah-oh.mp3";
import moneySound from "../assets/sounds/multipleCoins.mp3";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import PageLoading from "../components/pageLoading";
import { getWalletState, updateDanWalletState } from "../services/airtable";

const WalletContainer = styled("div")({
  height: "100vh",
  // paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  paddingTop: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const twentyHours = 1000 * 60 * 60 * 20;

const canCheckIn = (date1, date2) => {
  // return date2 - date1 > 86400000; // 1 day
  return date2 - date1 > twentyHours; // 20 hours
};

const Wallet = () => {
  const queryClient = useQueryClient();

  const { t, settings } = useContext(settingsContext);
  const [warningMessages, setWarningMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [playMoneySound] = useSound(moneySound, { volume: 0.5 });
  const [playAhOhSound] = useSound(ahOhSound, { volume: 0.1 });
  const {
    isSuccess,
    isLoading,

    data,
  } = useQuery("getWalletState", getWalletState, {
    refetchOnWindowFocus: false,
  });

  let danWalletId, danMoney, lastCheckInDate;
  if (isSuccess) {
    danWalletId = data[1].id;
    danMoney = data[1].fields.number.toFixed(2);
    lastCheckInDate = data[1].fields.lastCheckInDate;
  }

  const handleCheckIn = async () => {
    setIsFetching(true);
    const now = new Date().getTime();
    const addedDanMoney = Number((Math.random() / 2).toFixed(2));
    const newDanMoney = Number(danMoney) + addedDanMoney;
    await updateDanWalletState(danWalletId, newDanMoney, now, onUpdateFinish);
    playMoneySound();
    setWarningMessages([`${t("get_money.label")}$${addedDanMoney}`]);
  };

  const onUpdateFinish = async () => {
    queryClient.invalidateQueries("getWalletState").then(setIsFetching(false));
  };

  const nextCheckInAllowedTime = () => {
    const nextTime =
      (lastCheckInDate + twentyHours - new Date().getTime()) / (1000 * 60 * 60);
    if (nextTime < 0) return 0;
    return nextTime.toFixed(2);
  };

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <GlassFullContainer>
          <WalletContainer>
            <img
              src={moneyHeartPng}
              alt="wallet"
              height="100px"
              width="100px"
              style={{ marginTop: "100px" }}
            />
            <ItemContainer>
              <Typography color={settings["Dan"].primaryColor} variant="h5">
                {settings.Dan.nickname}
                {t("account_balance.label")}
              </Typography>
              <Typography color="textPrimary" variant="h5">
                $ {danMoney}
              </Typography>
              {canCheckIn(lastCheckInDate, new Date().getTime()) ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Avatar variant="rounded" src={coinsPng} />}
                  onClick={handleCheckIn}
                >
                  <Typography sx={{ color: "white" }} variant="h5">
                    {isFetching ? t("checking_in.label") : t("check_in.label")}
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Avatar variant="rounded" src={coinsPng} />}
                  onClick={() => {
                    setWarningMessages([
                      ...warningMessages,
                      t("already_checked_in_warning.label"),
                    ]);
                    playAhOhSound();
                  }}
                >
                  <Typography sx={{ color: "white" }} variant="h5">
                    {t("checked_in.label")}
                  </Typography>
                </Button>
              )}
              <Typography color="secondary" variant="h6">
                {t("time_before_next_check_in.label")}
                {nextCheckInAllowedTime()}
                {t("hours.label")}
              </Typography>
              {warningMessages.map((warningMessage, index) => {
                return (
                  <Typography key={index} color="primary" variant="h5">
                    {warningMessage}
                  </Typography>
                );
              })}
            </ItemContainer>
          </WalletContainer>
        </GlassFullContainer>
      )}
    </>
  );
};

export default Wallet;
