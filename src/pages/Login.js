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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginControlContainer = styled.div`
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

export const Login = (props) => {
  const [password, setPassword] = useState("");

  const [playActive] = useSound(popDownSound, { volume: 0.25 });
  const [playOn] = useSound(popUpOnSound, { volume: 0.25 });
  const [playOff] = useSound(popUpOffSound, { volume: 0.25 });

  const login = () => {
    password === process.env.REACT_APP_LOGIN_PASSWORD && props.login();
    setPassword("");
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
      <LoginControlContainer>
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
      </LoginControlContainer>
    </LoginContainer>
  );
};
