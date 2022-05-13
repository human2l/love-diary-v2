import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { Button, styled, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import ConfirmModal from "../components/confirmModal";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import PageLoading from "../components/pageLoading";
import TodoListPaper from "../components/todoList/todoListPaper";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  addTodo,
  addTodosHistory,
  deleteTodos,
  getAllTodos,
  updateTodo,
} from "../services/airtable";
import { getCurrentTimestamp } from "../utils/date_utils";

const TodoListContainer = styled("div")({
  boxSizing: "border-box",
  height: "100%",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 56,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const AddNewTodoContainer = styled("div")({
  width: "100%",
  margin: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const BottomControlContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
  marginTop: "auto",
});

const TodoList = () => {
  let navigate = useNavigate();

  const { t, user } = useContext(settingsContext);
  const [todo, setTodo] = useLocalStorage("todoDraft", "");
  const [archiveAlertState, setArchiveAlertState] = useState(false);

  const queryClient = useQueryClient();
  const fetchAllTodos = getAllTodos;
  const { isLoading, data: todosArray } = useQuery(
    "fetchAllTodos",
    fetchAllTodos
  );

  const handleAdd = useMutation(() => {
    const newTodo = {
      name: todo,
      user,
    };
    addTodo(newTodo, () => {
      queryClient.invalidateQueries("fetchAllTodos");
      setTodo("");
    });
  });

  const handleTodo = useMutation((todo) => {
    updateTodo(todo, () => {
      queryClient.invalidateQueries("fetchAllTodos");
    });
  });

  const onClickArchiveButton = () => {
    setArchiveAlertState(true);
  };

  const handleArchive = useMutation(() => {
    setArchiveAlertState(false);
    const deleteTodosArray = todosArray.filter((todo) => {
      return todo.user === user;
    });
    if (!deleteTodosArray.length) return;
    const time = getCurrentTimestamp();
    const todosHistory = {
      user,
      todos: JSON.stringify(deleteTodosArray),
      time,
    };
    const deleteTodosIdArray = deleteTodosArray.map((todo) => {
      return todo.id;
    });
    addTodosHistory(todosHistory, () => {
      deleteTodos(deleteTodosIdArray, () => {
        queryClient.invalidateQueries("fetchAllTodos");
      });
    });
  });

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <GlassFullContainer>
          <TodoListContainer>
            <AddNewTodoContainer>
              <TextField
                inputProps={{
                  autoComplete: "off",
                }}
                value={todo}
                label={t("todo_list.label")}
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  mr: 3,
                  backgroundColor: "white",
                  borderRadius: 2,
                  border: "8px solid white",
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setTodo(e.target.value);
                }}
              />
              <Fab color="primary" onClick={handleAdd.mutate} disabled={!todo}>
                <AddIcon />
              </Fab>
            </AddNewTodoContainer>
            <Typography
              pt="2px"
              pb="2px"
              pl="10px"
              pr="10px"
              sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
            >
              {t("added_todos.label")}
            </Typography>
            <TodoListPaper
              todosArray={todosArray}
              doneStatus={false}
              handleTodo={handleTodo.mutate}
            />

            <Typography
              pt="2px"
              pb="2px"
              pl="10px"
              pr="10px"
              sx={{ backgroundColor: "secondary.main", borderRadius: "5px" }}
            >
              {t("finished_todos.label")}
            </Typography>
            <TodoListPaper
              todosArray={todosArray}
              doneStatus={true}
              handleTodo={handleTodo.mutate}
            />
            <BottomControlContainer>
              <Button
                disabled={!todosArray.length}
                color="error"
                variant="contained"
                onClick={onClickArchiveButton}
                size="large"
                startIcon={<ArchiveIcon />}
              >
                {t("archive.label")}
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  navigate("/todoListHistory");
                }}
                size="large"
                startIcon={<HistoryOutlinedIcon />}
              >
                {t("show_history.label")}
              </Button>
            </BottomControlContainer>
          </TodoListContainer>
        </GlassFullContainer>
      )}
      {archiveAlertState && (
        <ConfirmModal
          confirmTitle={t("warning.label")}
          confirmDescription={t("archive_warning_content.label")}
          cancel={() => setArchiveAlertState(false)}
          confirm={handleArchive.mutate}
        />
      )}
    </>
  );
};
export default TodoList;
