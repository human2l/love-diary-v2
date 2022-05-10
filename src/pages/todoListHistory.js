import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useQuery } from "react-query";
import { settingsContext } from "../app";
import PageLoading from "../components/pageLoading";
import { getAllTodosHistory } from "../services/airtable";
import { getCountryDateFromTimestamp } from "../utils/date_utils";

const TodoListHistoryCardsContainer = styled("div")({
  paddingTop: "70px",
  marginLeft: 10,
  marginRight: 10,
  display: "flex",
  flexDirection: "column",
  paddingBottom: 65,
});

const CardContainer = styled(Card)({
  marginTop: 10,
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const TodosMetaContainer = styled("div")({
  display: "flex",
});

const TodoContainer = styled("div")({
  display: "flex",
});

const TodoListDashBoard = styled("div")({
  position: "fixed",
  height: "70px",
  width: "100%",
  background: `rgba(255,255,255,0.8)`,
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

const TodoListHistory = () => {
  const { settings } = useContext(settingsContext);

  const { isLoading, data: todosHistory } = useQuery(
    "getAllTodosHistory",
    getAllTodosHistory
  );

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <TodoListDashBoard>
            <FinishedRateGroup>
              <Typography variant="h5">Finished Rate</Typography>
              <Typography>100%</Typography>
            </FinishedRateGroup>
            <AchievedGroup>
              <Typography variant="h5">Achieved</Typography>
              <Typography>123</Typography>
            </AchievedGroup>
            <Typography variant="h2">Dan</Typography>
            <Typography variant="h2">vs</Typography>
            <Typography variant="h2">Kai</Typography>
            <AchievedGroup>
              <Typography variant="h5">Achieved</Typography>
              <Typography>123</Typography>
            </AchievedGroup>
            <FinishedRateGroup>
              <Typography variant="h5">Finished Rate</Typography>
              <Typography>100%</Typography>
            </FinishedRateGroup>
          </TodoListDashBoard>

          <TodoListHistoryCardsContainer>
            {todosHistory.map((history) => {
              return (
                <CardContainer key={history.id}>
                  <Card>
                    <CardContent>
                      <TitleContainer>
                        <Typography
                          variant="h5"
                          color={settings[history.user].primaryColor}
                          gutterBottom
                        >
                          {history.user}
                        </Typography>
                        <TodosMetaContainer>
                          <Typography color="textSecondary">
                            {getCountryDateFromTimestamp(
                              history.time,
                              settings[history.user].country
                            )}
                          </Typography>
                        </TodosMetaContainer>
                      </TitleContainer>

                      {history.todos.map((todo) => {
                        return (
                          <TodoContainer key={todo.id}>
                            {todo.done ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <WarningIcon color="error" />
                            )}
                            <Typography sx={{ ml: 1 }}>{todo.name}</Typography>
                          </TodoContainer>
                        );
                      })}
                    </CardContent>
                  </Card>
                </CardContainer>
              );
            })}
          </TodoListHistoryCardsContainer>
        </>
      )}
    </>
  );
};
export default TodoListHistory;
