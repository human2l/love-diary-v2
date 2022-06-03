import AddIcon from "@mui/icons-material/Add";
import { Button, styled, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { settingsContext } from "../app";
import archivePng from "../assets/images/archive.png";
import historyPng from "../assets/images/history.png";
import cashierMp3 from "../assets/sounds/cashier.mp3";
import ConfirmModal from "../components/confirmModal";
import GlassFullContainer from "../components/glassmorphism/glassFullContainer";
import PageLoading from "../components/pageLoading";
import TodoListPaper from "../components/todoList/todoListPaper";
import useLocalStorage from "../hooks/useLocalStorage";
import useTypingSound from "../hooks/useTypingSound";
import { addTodosHistory } from "../services/airtable/todosHistoryService";
import {
  addTodo,
  deleteTodos,
  getAllTodos,
  updateTodo,
} from "../services/airtable/todosService";
import { updateUserMoney } from "../services/airtable/walletService";
import { getCurrentTimestamp } from "../utils/date_utils";

const TodoListContainer = styled("div")({
  boxSizing: "border-box",
  height: "100%",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 65,
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

const ArchiveIcon = styled("img")({
  maxHeight: "25px",
});

const HistoryIcon = styled("img")({
  maxHeight: "25px",
});

const TodoList = () => {
  let navigate = useNavigate();
  const [playTypingSound] = useTypingSound();
  const [play] = useSound(cashierMp3, {
    volume: 0.5,
  });
  const { t, user, getPartner, settings } = useContext(settingsContext);
  const [todo, setTodo] = useLocalStorage("todoDraft", "");
  const [archiveAlertState, setArchiveAlertState] = useState(false);

  const queryClient = useQueryClient();
  const userId = settings[user].id;
  const partnerId = settings[getPartner()].id;
  const fetchAllTodos = async () => await getAllTodos([userId, partnerId]);
  const { isLoading, data: todosArray } = useQuery(
    "fetchAllTodos",
    fetchAllTodos
  );

  const handleChange = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
    playTypingSound();
  };

  const handleAdd = useMutation(() => {
    const newTodo = {
      createrId: userId,
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
    play();
    setArchiveAlertState(false);
    const userTodosArray = todosArray.filter((todo) => {
      return todo.createrId === settings[user].id;
    });
    const deleteTodosArray = userTodosArray.map((todo) => {
      // add money: 0.01--0.05
      const addAmount = Number((Math.random() * 0.04 + 0.01).toFixed(2));
      // minus money: 0.01--0.03
      const minusAmount = Number(
        (0 - (Math.random() * 0.02 + 0.01)).toFixed(2)
      );
      const deleteTodo = {
        ...todo,
        money: todo.done ? addAmount : minusAmount,
      };
      return deleteTodo;
    });
    if (!deleteTodosArray.length) return;
    const time = getCurrentTimestamp();
    const money = addedMoney(deleteTodosArray);
    const todosHistory = {
      user,
      todos: JSON.stringify(deleteTodosArray),
      time,
      money,
    };
    const deleteTodosIdArray = deleteTodosArray.map((todo) => {
      return todo.id;
    });
    addTodosHistory(todosHistory, () => {
      updateUserMoney(user, money);
      deleteTodos(deleteTodosIdArray, () => {
        queryClient.invalidateQueries("fetchAllTodos");
      });
    });
  });

  const addedMoney = (todosArray) => {
    const addMoney = todosArray.reduce((sum, todo) => {
      const newSum = sum + Number(todo.money);
      return newSum;
    }, 0);
    return Number(addMoney.toFixed(2));
  };

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
                onChange={(e) => handleChange(e)}
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
                size="medium"
              >
                <ArchiveIcon src={archivePng} />
                {t("archive.label")}
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  navigate("/todoListHistory");
                }}
                size="medium"
              >
                <HistoryIcon src={historyPng} />
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
