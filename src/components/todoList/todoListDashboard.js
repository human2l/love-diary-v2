import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { settingsContext } from "../../app";

const TodoListDashBoardContainer = styled("div")({
  position: "fixed",
  height: "70px",
  width: "100%",
  background: `rgba(255,255,255,1)`,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const AchievedGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const FinishedRateGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const TodoListDashboard = ({ todosHistory }) => {
  const { user, settings } = useContext(settingsContext);

  return (
    <TodoListDashBoardContainer
      sx={{
        boxShadow: `0 -10px 40px ${settings[user].primaryColor}`,
      }}
    >
      <FinishedRateGroup>
        <Typography variant="h5" color={settings["Dan"].primaryColor}>
          Finished Rate
        </Typography>
        <Typography variant="h5" color={settings["Dan"].secondaryColor}>
        </Typography>
      </FinishedRateGroup>
      <AchievedGroup>
        <Typography variant="h5" color={settings["Dan"].primaryColor}>
          Achieved
        </Typography>
        <Typography variant="h5" color={settings["Dan"].secondaryColor}>
        </Typography>
      </AchievedGroup>
      <Typography variant="h2" color={settings["Dan"].primaryColor}>
        Dan
      </Typography>
      <Typography variant="h3">vs</Typography>
      <Typography variant="h2" color={settings["Kai"].primaryColor}>
        Kai
      </Typography>
      <AchievedGroup>
        <Typography variant="h5" color={settings["Kai"].primaryColor}>
          Achieved
        </Typography>
        <Typography variant="h5" color={settings["Kai"].secondaryColor}>
        </Typography>
      </AchievedGroup>
      <FinishedRateGroup>
        <Typography variant="h5" color={settings["Kai"].primaryColor}>
          Finished Rate
        </Typography>
        <Typography variant="h5" color={settings["Kai"].secondaryColor}>
        </Typography>
      </FinishedRateGroup>
    </TodoListDashBoardContainer>
  );
};
export default TodoListDashboard;
