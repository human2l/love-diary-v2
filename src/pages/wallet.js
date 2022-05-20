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
import GlassRoundContainer from "../components/glassmorphism/glassRoundContainer";
import PageLoading from "../components/pageLoading";
import {
  getWalletState,
  updateUserWalletState,
} from "../services/airtable/walletService";

const WalletContainer = styled("div")({
  boxSizing: "border-box",
  paddingTop: 30,
  marginLeft: "auto",
  marginRight: "auto",
  width: "90%",
  height: "100%",
});

const ContentContainer = styled("div")({
  paddingTop: "50px",
  paddingBottom: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  // paddingTop: 20,
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

  const { t, user, getPartner, settings } = useContext(settingsContext);
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

  let userWalletId, userMoney, partnerMoney, lastCheckInDate;
  if (isSuccess) {
    userWalletId = data[user].id;
    userMoney = data[user].number.toFixed(2);
    partnerMoney = data[getPartner()].number.toFixed(2);
    lastCheckInDate = data[user].lastCheckInDate;
  }

  const handleCheckIn = async () => {
    setIsFetching(true);
    const now = new Date().getTime();
    const addedUserMoney = Number((Math.random() / 2).toFixed(2));
    const newUserMoney = Number(userMoney) + addedUserMoney;
    await updateUserWalletState(
      userWalletId,
      newUserMoney,
      now,
      onUpdateFinish
    );
    playMoneySound();
    setWarningMessages([`${t("get_money.label")}$${addedUserMoney}`]);
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
        <WalletContainer>
          <GlassRoundContainer>
            <ContentContainer>
              <img
                src={moneyHeartPng}
                alt="wallet"
                height="100px"
                width="100px"
              />
              <ItemContainer>
                <Typography
                  color={settings[getPartner()].primaryColor}
                  variant="h5"
                >
                  {settings[getPartner()].nickname}
                  {t("account_balance.label")}
                </Typography>
                <Typography
                  color={settings[getPartner()].primaryColor}
                  variant="h5"
                >
                  $ {partnerMoney}
                </Typography>
                <Typography color={settings[user].primaryColor} variant="h5">
                  {settings[user].nickname}
                  {t("account_balance.label")}
                </Typography>
                <Typography color={settings[user].primaryColor} variant="h5">
                  $ {userMoney}
                </Typography>
                {canCheckIn(lastCheckInDate, new Date().getTime()) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Avatar variant="rounded" src={coinsPng} />}
                    onClick={handleCheckIn}
                  >
                    <Typography sx={{ color: "white" }} variant="h5">
                      {isFetching
                        ? t("checking_in.label")
                        : t("check_in.label")}
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
            </ContentContainer>
          </GlassRoundContainer>
        </WalletContainer>
      )}
    </>
  );
};

export default Wallet;
