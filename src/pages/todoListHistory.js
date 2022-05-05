// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useQuery } from "react-query";
import { settingsContext } from "../app";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import { getAllTodosHistory } from "../services/airtable";
import { getCountryDateFromTimestamp } from "../utils/date_utils";

const TodoListHistoryContainer = styled("div")({
  boxSizing: "border-box",
  marginLeft: 10,
  marginRight: 10,
  paddingBottom: 65,
  // maxWidth: 500,
  display: "flex",
  flexDirection: "column",
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
  //   justifyContent: "space-between",
});

const TodoListHistory = () => {
  //   let navigate = useNavigate();
  const { settings } = useContext(settingsContext);

  const { isLoading, data: todosHistory } = useQuery(
    "getAllTodosHistory",
    getAllTodosHistory
  );

  return (
    <TodoListHistoryContainer>
      {isLoading ? (
        <img src={loadingHeartsSvg} alt="loading" />
      ) : (
        todosHistory.map((history) => {
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
        })
      )}
    </TodoListHistoryContainer>
    // <Button
    //   color="primary"
    //   variant="contained"
    //   onClick={() => {
    //     navigate("/todoList");
    //   }}
    //   size="large"
    //   startIcon={<ArrowBackOutlinedIcon />}
    // >
    //   返回
    // </Button>
  );
};
export default TodoListHistory;
