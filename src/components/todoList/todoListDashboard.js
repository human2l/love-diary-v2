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
  const { user, settings } = useContext(settingsContext);

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
        boxShadow: `0 -15px 20px ${settings[user].primaryColor}`,
      }}
    >
      <FinishedRateGroup>
        <Typography variant="h0" color={settings["Dan"].primaryColor}>
          Finished Rate
        </Typography>
        <Typography variant="h0" color={settings["Dan"].secondaryColor}>
          {userTodosDoneRate("Dan")}%
        </Typography>
      </FinishedRateGroup>
      <AchievedGroup>
        <Typography variant="h0" color={settings["Dan"].primaryColor}>
          Achieved
        </Typography>
        <Typography variant="h0" color={settings["Dan"].secondaryColor}>
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
          Achieved
        </Typography>
        <Typography variant="h0" color={settings["Kai"].secondaryColor}>
          {userAchieved("Kai").length}
        </Typography>
      </AchievedGroup>
      <FinishedRateGroup>
        <Typography variant="h0" color={settings["Kai"].primaryColor}>
          Finished Rate
        </Typography>
        <Typography variant="h0" color={settings["Kai"].secondaryColor}>
          {userTodosDoneRate("Kai")}%
        </Typography>
      </FinishedRateGroup>
    </TodoListDashboardContainer>
  );
};
export default TodoListDashboard;
