import { useState, useEffect, useContext, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import useSound from "use-sound";
import { styled } from "@mui/material/styles";
import walletSVG from "../assets/images/wallet.svg";
import dollarPng from "../assets/images/dollar.png";
import moneySound from "../assets/sounds/multipleCoins.mp3";
import ahOhSound from "../assets/sounds/ah-oh.mp3";
import useAirtable from "../hooks/useAirtable";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import { settingsContext } from "../App";
import { useTranslation } from "react-i18next";

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

export const Wallet = () => {
  const { t } = useTranslation();
  const { getWalletState, updateDanWalletState } = useAirtable();
  const { settings } = useContext(settingsContext);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [danWalletId, setDanWalletId] = useState(undefined);
  const [danMoney, setDanMoney] = useState("");
  const [lastCheckInDate, setLastCheckInDate] = useState(Infinity);
  const [warningMessages, setWarningMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playMoneySound] = useSound(moneySound, { volume: 0.5 });
  const [playAhOhSound] = useSound(ahOhSound, { volume: 0.5 });

  const handleCheckIn = async () => {
    setIsLoading(true);
    const now = new Date().getTime();
    const addedDanMoney = Number((Math.random() / 2).toFixed(2));
    const newDanMoney = Number(danMoney) + addedDanMoney;
    await updateDanWalletState(danWalletId, newDanMoney, now, onUpdateFinish);
    playMoneySound();
    setWarningMessages(`${t("get_money.label")}$${addedDanMoney}`);
  };

  const onUpdateFinish = async () => {
    await refreshStates();
  };

  const nextCheckInAllowedTime = () => {
    const nextTime =
      (lastCheckInDate + twentyHours - new Date().getTime()) / (1000 * 60 * 60);
    if (nextTime < 0) return 0;
    return nextTime.toFixed(2);
  };

  const refreshStates = useCallback(async () => {
    const walletState = await getWalletState();
    setDanWalletId(walletState[1].id);
    setDanMoney(walletState[1].fields.number.toFixed(2));
    setLastCheckInDate(walletState[1].fields.lastCheckInDate);
    setIsLoading(false);
    setIsPageLoading(false);
  }, [getWalletState]);

  useEffect(() => {
    (async () => {
      await refreshStates();
    })();
  }, [refreshStates]);

  return (
    <>
      <WalletContainer>
        {isPageLoading ? (
          <img src={loadingHeartsSvg} alt="loading" />
        ) : (
          <>
            <img
              src={walletSVG}
              alt="wallet"
              height="50px"
              width="50px"
              style={{ marginTop: "100px" }}
            />
            <ItemContainer>
              <Typography color="initial" variant="h5">
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
                  startIcon={<Avatar src={dollarPng} />}
                  onClick={handleCheckIn}
                >
                  <Typography sx={{ color: "white" }} variant="h5">
                    {isLoading ? t("checking_in.label") : t("check_in.label")}
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Avatar src={dollarPng} />}
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
          </>
        )}
      </WalletContainer>
      {/* <a href="https://www.flaticon.com/free-icons/coin" title="coin icons">
        Coin icons created by Freepik - Flaticon
      </a> */}
    </>
  );
};
