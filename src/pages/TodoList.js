import { Button, styled, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { settingsContext } from "../App";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import TodoListPaper from "../components/TodoListPaper";
import { addTodo, getAllTodos, updateTodo } from "../services/airtable";

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

const TodoList = () => {
  const { user } = useContext(settingsContext);

  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();
  const fetchAllTodos = getAllTodos;
  const { isLoading, data: todoArray } = useQuery(
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
    });
  });

  const handleCheck = useMutation((todo) => {
    todo.done = true;
    updateTodo(todo, () => {
      queryClient.invalidateQueries("fetchAllTodos");
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
                label="新的Flag"
                variant="outlined"
                size="small"
                sx={{ flex: 1, mr: 3 }}
                onChange={(e) => {
                  e.preventDefault();
                  setTodo(e.target.value);
                }}
              />
              <Button variant="contained" onClick={handleAdd.mutate}>
                添加
              </Button>
            </AddNewTodoContainer>
            <Typography>立下的Flag</Typography>
            <TodoListPaper
              todoArray={todoArray}
              doneStatus={false}
              handleCheck={handleCheck.mutate}
            />

            <Typography>未完成的Flag</Typography>
            <TodoListPaper todoArray={todoArray} doneStatus={true} />
          </>
        )}
      </TodoListContainer>
    </>
  );
};
export default TodoList;
