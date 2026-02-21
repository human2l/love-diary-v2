import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import { settingsContext } from "../app";
import ahOhSound from "../assets/sounds/ah-oh.mp3";
import popDownSound from "../assets/sounds/pop-down.mp3";
import popUpOffSound from "../assets/sounds/pop-up-off.mp3";
import popUpOnSound from "../assets/sounds/pop-up-on.mp3";
import GlassRoundContainer from "../components/glassmorphism/glassRoundContainer";

const LoginLabel = styled(Typography)`
  border-radius: 20px;
  text-align: center;
`;

const LoginContainer = styled.div`
  height: 100%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginControlContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  max-width: 400px;
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

const Login = (props) => {
  const { t } = useContext(settingsContext);
  const [loggingIn, setLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [incorrectPasswordAlert, setIncorrectPasswordAlert] = useState(false);
  const [playActive] = useSound(popDownSound, { volume: 0.25 });
  const [playOn] = useSound(popUpOnSound, { volume: 0.25 });
  const [playOff] = useSound(popUpOffSound, { volume: 0.25 });
  const [playAhOhSound] = useSound(ahOhSound, { volume: 0.1 });

  const login = async () => {
    setLoggingIn(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (data.success) {
        setIncorrectPasswordAlert(false);
        props.login(data.user);
      } else {
        setLoggingIn(false);
        setIncorrectPasswordAlert(true);
        playAhOhSound();
        setPassword("");
      }
    } catch (e) {
      setLoggingIn(false);
      setIncorrectPasswordAlert(true);
      playAhOhSound();
      setPassword("");
    }
  };
  const onPasswordButtonClick = (buttonValue) => {
    setPassword(password + buttonValue);
  };

  const padArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <LoginContainer>
      <GlassRoundContainer>
        <LoginControlContainer>
          <LoginLabel
            sx={{ color: "primary.main", backgroundColor: "text.light" }}
            variant="h4"
          >
            {t("password_required.label")}🤪
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
              {padArray.map((row, arrayIndex) => {
                return (
                  <Grid container item xs={12} spacing={1} key={arrayIndex}>
                    {row.map((number, numberIndex) => {
                      return (
                        <Grid item xs={4} key={numberIndex}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              onPasswordButtonClick(number);
                            }}
                            style={{
                              borderRadius: "20px",
                              width: "100%",
                              maxWidth: "130px",
                              aspectRatio: "1/1",
                            }}
                            onMouseDown={playActive}
                            onMouseUp={() => {
                              playOff();
                            }}
                          >
                            <PasswordButtonText
                              sx={{ color: "white" }}
                              variant="h1"
                            >
                              {number}
                            </PasswordButtonText>
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              })}
            </Grid>
          </PasswordPad>
          <LoadingButton
            variant="contained"
            color="primary"
            size="large"
            onClick={login}
            onMouseDown={playActive}
            onMouseUp={() => {
              playOn();
            }}
            sx={{ mb: "10px", borderRadius: "20px" }}
            loading={loggingIn}
            loadingIndicator={
              <Typography color="primary">Logging in...</Typography>
            }
          >
            {t("login.label")}
          </LoadingButton>
          {incorrectPasswordAlert && (
            <Typography variant="h6" sx={{ m: "auto", mb: "5px" }}>
              Wrong password.🌚
            </Typography>
          )}
        </LoginControlContainer>
      </GlassRoundContainer>
    </LoginContainer>
  );
};

export default Login;
