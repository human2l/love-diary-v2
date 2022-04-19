import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import useSound from "use-sound";
import popDownSound from "../assets/sounds/pop-down.mp3";
import popUpOnSound from "../assets/sounds/pop-up-on.mp3";
import popUpOffSound from "../assets/sounds/pop-up-off.mp3";

//TODO add theme color
const LoginLabel = styled(Typography)`
  border-radius: 50px;
  text-align: center;
`;

const LoginContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PasswordPad = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
`;

const PasswordButtonText = styled(Typography)``;

export const Login = (props) => {
  const [password, setPassword] = useState("");

  const [playActive] = useSound(popDownSound, { volume: 0.25 });
  const [playOn] = useSound(popUpOnSound, { volume: 0.25 });
  const [playOff] = useSound(popUpOffSound, { volume: 0.25 });

  const login = () => {
    password === "5181226" && props.login();
    setPassword("");
  };
  const onPasswordButtonClick = (buttonValue) => {
    setPassword(password + buttonValue);
  };

  return (
    <LoginContainer>
      <LoginLabel
        sx={{ color: "primary.main", backgroundColor: "text.light" }}
        variant="h4"
      >
        不输密码不让看🤪
      </LoginLabel>
      <PasswordPad>
        <Grid
          container
          spacing={1}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("1");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  1
                </PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("2");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  2
                </PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("3");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  3
                </PasswordButtonText>
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("4");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  4
                </PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("5");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  5
                </PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("6");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  6
                </PasswordButtonText>
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("7");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  7
                </PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("8");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  8
                </PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("9");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
                onMouseDown={playActive}
                onMouseUp={() => {
                  playOff();
                }}
              >
                <PasswordButtonText sx={{ color: "white" }} variant="h1">
                  9
                </PasswordButtonText>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </PasswordPad>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={login}
        onMouseDown={playActive}
        onMouseUp={() => {
          playOn();
        }}
      >
        登录
      </Button>
    </LoginContainer>
  );
};
