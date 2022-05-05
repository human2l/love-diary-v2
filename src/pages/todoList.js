import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { Button, styled, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { settingsContext } from "../app";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import ConfirmModal from "../components/confirmModal";
import TodoListPaper from "../components/todoListPaper";
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

  const { user } = useContext(settingsContext);
  const { t } = useTranslation();
  const [todo, setTodo] = useState("");
  const [archiveAlertState, setArchiveAlertState] = useState(false);

  const queryClient = useQueryClient();
  const fetchAllTodos = getAllTodos;
  const { isLoading, data: todosArray } = useQuery(
    "fetchAllTodos",
    fetchAllTodos
  );

  const handleAdd = useMutation(() => {
    if (!todo.length) return;
    const newTodo = {
      name: todo,
      user,
    };
    addTodo(newTodo, () => {
      queryClient.invalidateQueries("fetchAllTodos");
      setTodo("");
    });
  });

  const handleCheck = useMutation((todo) => {
    todo.done = true;
    updateTodo(todo, () => {
      queryClient.invalidateQueries("fetchAllTodos");
    });
  });

  const onClickArchiveButton = () => {
    if (!todosArray.length) return;
    setArchiveAlertState(true);
  };

  const handleArchive = useMutation(() => {
    setArchiveAlertState(false);
    const deleteTodosArray =
      todosArray.find((todo) => {
        return todo.user === user;
      }) ?? [];
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
      <TodoListContainer>
        {isLoading ? (
          <img src={loadingHeartsSvg} alt="loading" />
        ) : (
          <>
            <AddNewTodoContainer>
              <TextField
                value={todo}
                label={t("todo_list.label")}
                variant="outlined"
                size="small"
                sx={{ flex: 1, mr: 3 }}
                onChange={(e) => {
                  e.preventDefault();
                  setTodo(e.target.value);
                }}
              />
              <Button
                variant="contained"
                onClick={handleAdd.mutate}
                startIcon={<AddBoxOutlinedIcon />}
              >
                {t("add.label")}
              </Button>
            </AddNewTodoContainer>
            <Typography>{t("added_todos.label")}</Typography>
            <TodoListPaper
              todosArray={todosArray}
              doneStatus={false}
              handleCheck={handleCheck.mutate}
            />

            <Typography>{t("finished_todos.label")}</Typography>
            <TodoListPaper todosArray={todosArray} doneStatus={true} />
            <BottomControlContainer>
              <Button
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
          </>
        )}
        {archiveAlertState && (
          <ConfirmModal
            confirmTitle={t("warning.label")}
            confirmDescription={t("archive_warning_content.label")}
            cancel={() => setArchiveAlertState(false)}
            confirm={handleArchive.mutate}
          />
        )}
      </TodoListContainer>
    </>
  );
};
export default TodoList;
