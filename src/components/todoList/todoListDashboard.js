import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { settingsContext } from "../../app";

const TodoListDashboardContainer = styled("div")({
  position: "fixed",
  height: "50px",
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
  const { t, user, settings } = useContext(settingsContext);

  const userTodos = (user) => {
    return todosHistory
      .filter((history) => {
        return history.user === user;
      })
      .map((history) => {
        return [...history.todos];
      })
      .flat(1);
  };

  const userAchieved = (user) => {
    return userTodos(user).filter((todo) => {
      return todo.done;
    });
  };

  const userTodosDoneRate = (user) => {
    return Math.floor(
      (userAchieved(user).length / userTodos(user).length) * 100
    );
  };

  return (
    <TodoListDashboardContainer
      sx={{
        boxShadow: `0 -15px 30px ${settings[user].primaryColor}`,
      }}
    >
      <FinishedRateGroup>
        <Typography variant="h0" color={settings["Dan"].primaryColor}>
          {t("finished_rate.label")}
        </Typography>
        <Typography
          variant="h0"
          color={settings["Dan"].secondaryColor}
          sx={{ mt: "5px" }}
        >
          {userTodosDoneRate("Dan")}%
        </Typography>
      </FinishedRateGroup>
      <AchievedGroup>
        <Typography variant="h0" color={settings["Dan"].primaryColor}>
          {t("achieved.label")}
        </Typography>
        <Typography
          variant="h0"
          color={settings["Dan"].secondaryColor}
          sx={{ mt: "5px" }}
        >
          {userAchieved("Dan").length}
        </Typography>
      </AchievedGroup>
      <Typography variant="h4" color={settings["Dan"].primaryColor}>
        Dan
      </Typography>
      <Typography variant="h5">vs</Typography>
      <Typography variant="h4" color={settings["Kai"].primaryColor}>
        Kai
      </Typography>
      <AchievedGroup>
        <Typography variant="h0" color={settings["Kai"].primaryColor}>
          {t("achieved.label")}
        </Typography>
        <Typography
          variant="h0"
          color={settings["Kai"].secondaryColor}
          sx={{ mt: "5px" }}
        >
          {userAchieved("Kai").length}
        </Typography>
      </AchievedGroup>
      <FinishedRateGroup>
        <Typography variant="h0" color={settings["Kai"].primaryColor}>
          {t("finished_rate.label")}
        </Typography>
        <Typography
          variant="h0"
          color={settings["Kai"].secondaryColor}
          sx={{ mt: "5px" }}
        >
          {userTodosDoneRate("Kai")}%
        </Typography>
      </FinishedRateGroup>
    </TodoListDashboardContainer>
  );
};
export default TodoListDashboard;
