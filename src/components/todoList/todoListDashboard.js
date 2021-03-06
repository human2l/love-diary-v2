import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { settingsContext } from "../../app";

const TodoListDashboardContainer = styled("div")({
  position: "fixed",
  width: "100%",
  maxWidth: "700px",
  paddingBottom: "5px",
  background: `rgba(255,255,255,1)`,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
});

const TitleContainer = styled("div")({
  // display: "inline-block",
  paddingBottom: "5px",
  display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
});

const ItemsContainer = styled("div")({
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
  const { t, user, partner, settings } = useContext(settingsContext);

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
    const doneRate = Math.floor(
      (userAchieved(user).length / userTodos(user).length) * 100
    );
    return isNaN(doneRate) ? 0 : doneRate;
  };

  return (
    <TodoListDashboardContainer
      sx={{
        boxShadow: `0 -5px 20px ${settings[user].primaryColor}`,
      }}
    >
      <TitleContainer>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            color={settings[user].primaryColor}
            align="right"
          >
            {settings[user].nickname}
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ ml: "10px", mr: "10px" }}>
          vs
        </Typography>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" color={settings[partner].primaryColor}>
            {settings[partner].nickname}
          </Typography>
        </Box>
      </TitleContainer>
      <ItemsContainer>
        <FinishedRateGroup>
          <Typography variant="h0" color={settings[user].primaryColor}>
            {t("finished_rate.label")}
          </Typography>
          <Typography
            variant="h0"
            color={settings[user].secondaryColor}
            sx={{ mt: "5px" }}
          >
            {userTodosDoneRate(user)}%
          </Typography>
        </FinishedRateGroup>
        <AchievedGroup>
          <Typography variant="h0" color={settings[user].primaryColor}>
            {t("achieved.label")}
          </Typography>
          <Typography
            variant="h0"
            color={settings[user].secondaryColor}
            sx={{ mt: "5px" }}
          >
            {userAchieved(user).length}
          </Typography>
        </AchievedGroup>

        <AchievedGroup>
          <Typography variant="h0" color={settings[partner].primaryColor}>
            {t("achieved.label")}
          </Typography>
          <Typography
            variant="h0"
            color={settings[partner].secondaryColor}
            sx={{ mt: "5px" }}
          >
            {userAchieved(partner).length}
          </Typography>
        </AchievedGroup>
        <FinishedRateGroup>
          <Typography variant="h0" color={settings[partner].primaryColor}>
            {t("finished_rate.label")}
          </Typography>
          <Typography
            variant="h0"
            color={settings[partner].secondaryColor}
            sx={{ mt: "5px" }}
          >
            {userTodosDoneRate(partner)}%
          </Typography>
        </FinishedRateGroup>
      </ItemsContainer>
    </TodoListDashboardContainer>
  );
};
export default TodoListDashboard;
