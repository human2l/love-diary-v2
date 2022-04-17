import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import walletSVG from "../assets/wallet.svg";
import { getDanMoney } from "../utils/airtable";

const WalletContainer = styled("div")({
  paddingTop: "100px",
  height: "100vh",
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Wallet = () => {
  const [danMoney, setDanMoney] = useState("");

  useEffect(() => {
    (async () => {
      setDanMoney(await getDanMoney());
    })();
  }, []);

  return (
    <WalletContainer>
      <img src={walletSVG} alt="wallet" height="50px" width="50px" />
      <ItemContainer>
        <Typography color="initial" variant="h5">
          蛋蛋账户余额
        </Typography>
        <Typography color="textPrimary" variant="h5">
          $ {danMoney}
        </Typography>
        <Typography color="initial" variant="h5">
          凯凯账户余额
        </Typography>
        <Typography color="secondary" variant="h5">
          灰常多，老有钱了
        </Typography>
      </ItemContainer>
    </WalletContainer>
  );
};
