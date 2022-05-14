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
import TodoListDashboard from "../components/todoList/todoListDashboard";
import { getAllTodosHistory } from "../services/airtable/todosHistoryService";
import { getCountryDateFromTimestamp } from "../utils/date_utils";

const TodoListHistoryCardsContainer = styled("div")({
  paddingTop: "50px",
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
          <TodoListDashboard todosHistory={todosHistory} />

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
                            <Typography
                              color={settings[todo.user].primaryColor}
                              sx={{ ml: 1 }}
                            >
                              {todo.name}
                            </Typography>
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
